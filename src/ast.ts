import * as fs from "fs";
import * as path from "path";
import { ASTNode, ASTWriter, CompileResult, ContractDefinition, FunctionCall, FunctionDefinition, FunctionVisibility, Identifier, IdentifierPath, MemberAccess, SourceUnit } from "solc-typed-ast";
import { ASTReader } from "solc-typed-ast";
import { writeFileSync } from "fs";
import {
    DefaultASTWriterMapping,
    LatestCompilerVersion,
    PrettyFormatter
} from "solc-typed-ast";
import { openaiCompletion, solidityTransformer, OpenAIContext, vulnerabilityTransformer, Vulnerability, vulnerabilityEvaluationTransformer } from "./openaiWrapper";
import { work_on_json } from "./compiler";
import { RagContext } from "./weaviate_ingest";

const formatter = new PrettyFormatter(4, 0);
const RETRIES = 10;
const VulnerabilityTypes = ["1. DAO Management. Manipulation of governance voting results. For example, if a DAO allows proposals to be immediately commited without a mandatory waiting period, leaving itself vulnerable to attackers that take out a flashloan to force a proposal through",
                            "2. Function is priviledged (e.g. could increase user balance without making any payment) and lacks proper access control. Allowing anyone to access priviledged functions that could cause fund loss if called by non-authorized users",
                            "3. Protocol insolvency", 
                            "4. Theft or freezing of unclaimed yield", 
                            "5. Block stuffing for profit",
                            "6. Griefing (an attacker causing damage to the users or the protocol without any profit motive)",
                            "7. Lack of calldata validation. Takes 'bytes calldata' parameter and directly pass it to other handler functions without validating the content of the calldata. Allowing users to pass in arbitrary (and potentially malicious) calldata.",
                            "8. Deflationary token. Public functions that could cause liquidity pool to become imbalanced (token balance or reserve change) if called repeatedly. A case of such vulnerability is **charging fees or burning tokens on each transfer**",
                            "9. Price oracle manipulation. Calculating price without any time weighted average price mechanism implemented in order to prevent potential single block manipulation",
                            "10. Lack of input validation. Swaping tokens without checking whether the tokens going in and out are not the same",
                            "11. Price oracle manipulation. Failing to ensure that the price for the same token is calculated consistently in a single transaction",
                            "12. DAO Management. Lack of proposal/EIP validation mechanism, making the DAO susceptible to attackers pushing proposal through with flashloan",
                            "13. uint underflow/overflow. Performing arithematic operations (addition, subtraction, multiplication and devision) directly without using SafeMath to ensure that the it produces the expected value and won't cause undeflow/overflow."]
const VulnerabilityGenerationGuidelines = ["1. If the function under test invokes another function, and the source code of the other function is also provided in the prompt, then consider the potential vulnerabilities in the other function as part of current function's.",
                                           "2. In the vulnerabilityDescription field, describe this practical, exploitable code vulnerability in detail and provide an example how the vulnerability could happen. It should be logical and an error or logic missing in the code.",
                                           "3. In the vulnerabilityType field, choose from the provided enum the vulnerability type that aligns the most closely with the vulnerability you described",
                                           "4. Remember, all numbers in the code are positive, the code eecution is atomic, which means the excution would not be interuppted or manipulated by another address from another transaction, and safemath is in use.",
                                           "5. Assume that the attack can not have the role of the owner of the contract and it is active.",
                                           "6. Read the context for this session. If a type of vulnerability is already reported for the current function, don't report it again. Find the next most likely type of vulnerability."]
const VulnerabilityEvaluationGuidelines = ["1. In the vulnerabilityAssertion field, describe what one should check after each transaction to make sure the potential vulnerability is not exploited in that transaction? **Describe the check in terms of STATE VARIABLES and results of View functions. You DO NOT have access to function parameters or local variables**.",
                                           `2. In the vulnerabilityLikelihood field, choose the likelihood of the vulnerability. If you think the report is false positive, choose "low" here. If you think the reported vulnerability is unlikely to happen or won't cause loss and disruptions, choose "medium" here. If you think the reported vulnerability aligns with the guidelines and could happen, choose "high" here.`];

function getFileCode(ctx: ContractContext, filename: string) {
    const writer = new ASTWriter(
        DefaultASTWriterMapping,
        formatter,
        ctx.compilerVersion || LatestCompilerVersion
    );

    for (const sourceUnit of ctx.sourceUnits) {
        if (sourceUnit.absolutePath === filename) {
            return writer.write(
                sourceUnit
            )
        }
    }
    return "";
}


function writeCtxToFolders(ctx: ContractContext, baseFolder: string, replacements?: Map<string, string>, remappings?: string[]) {
    for (let [path, code] of writeCtx(ctx, replacements, null)) {
        let absPath = baseFolder + "/" + path;
        let basePath = absPath.split("/").slice(0, -1).join("/");
        if (!fs.existsSync(basePath)) {
            fs.mkdirSync(basePath, { recursive: true });
        }
        writeFileSync(absPath, code);
    }
    if (remappings) {
        fs.writeFileSync(baseFolder + "/remappings.txt", remappings.join("\n"));
    }
}

function writeCtx(ctx: ContractContext, replacements?: Map<string, string>, additions?: Map<string, string>): Map<string, string> {
    let results = additions || new Map<string, string>();
    for (let sourceunit of ctx.sourceUnits) {
        let writer = new ASTWriter(
            DefaultASTWriterMapping,
            formatter,
            ctx.compilerVersion
        );
        let code = writer.write(sourceunit);
        if (replacements?.get(sourceunit.absolutePath)) {
            code = replacements.get(sourceunit.absolutePath) || "";
        }
        results.set(sourceunit.absolutePath, code);
    }
    return results;
}


async function tryCompile(contracts: Map<string, string>, remappings: string[], compiler_version: string, supressErrors: boolean = false) {
    let compiler_json = {
        language: "Solidity",
        sources: {},
        settings: {
            remappings: remappings,
        }
    } as {
        language: string;
        sources: { [key: string]: { content: string } };
        settings: { [key: string]: any };
    }

    for (let [path, code] of contracts) {
        compiler_json.sources[path] = {
            content: code
        }
    }

    return await work_on_json(
        "v" + compiler_version,
        compiler_json,
        null,
        supressErrors
    )
}

function isParsingError (x: string) {
    if (x === null || x === undefined) {
        return false;
    }
    return x.includes("ParserError") || x.includes("SyntaxError: Free functions cannot have visibility.");
}

const FIX_PROMPT = `The code you provided has following syntax error. Please fix the error and provide the code again. **You can only modify the content within the contract "GeneratedInvariants"**. Please follow these guidelines: \n\n{{FIX_GUIDELINES}}`;

const FIX_GUIDELINES = [
    "a. If you are not able to fix the error for a specific invariant, please think of another way of writing the same invariant. Don't just delete or reduce its logic.",
    `b. In EVM, there is no public variable. If you are trying to access a public state variable, call it as a function. For example, to access public variable "x" of contract "y", you need to invoke "y.x()."`,
    `c. If you are trying to assert, then use Foundry's built-in assert methods: [assertTrue, assertFalse,, assertEq, etc...]. Otherwise you can also just return the boolean expression.`,
    `d. Do no try to implement missing contracts or interfaces, and do not assume you have access to functions that are not already provided as interface or source code.`,
    `e. Invariant test functions should start with "invariant_" prefix. Do not change the prefix. Do not change the "setUp" function.`,
    "f. When trying to verify time relationships, try using timestamp methods"
]

// Compile
async function llmWorkflowOffchain(abi: Map<string, any[]>, ctx: ContractContext, ragCtx: RagContext, remappings: string[], setupContractId: string, targetContractId: string) {
    let slugs = []
    for (let [key, _] of abi) {
        slugs.push(key);
    }
    console.log("Available setup files and contracts: \n" + slugs.join("\n"));
    let matchingSetups = slugs.filter((x) => x.includes(setupContractId));
    if (matchingSetups.length === 0) {
        throw new Error("Setup file not found");
    }
    if (matchingSetups.length > 1) {
        throw new Error("Multiple setup files found");
    }

    console.log("Prompting OpenAI")

    console.log("Prompting OpenAI with Chain-of-Thoughts: Verifier Stage");

    console.log("Verifier Step 1: set up character and give guidelines");
    let characterPrompt = createPromptForCharacterGuidelines(ctx, targetContractId);
    console.log(characterPrompt);
    let characterCtx = await openaiCompletion(characterPrompt, 0, [], "system");

    console.log("Verifier Step 2: identify functions with potential vulnerabilities, and respond in a format");
    let vulnerabilities: Vulnerability[] = [];
    for (let publicFunctionId of ctx.AllPublicFunctions.get(targetContractId)) {
        // LLM generate 3 potentialy vulnerabilities for each function
        let previousCtx = characterCtx;
        for (const idx of [0, 1, 2]) {
            console.log("Generating vulnerability #" + idx.toString(), "for function", publicFunctionId);
            previousCtx = await generatedAndEvaluateVulnerability(ctx, targetContractId, publicFunctionId, idx, previousCtx, vulnerabilities);
            if (previousCtx == null) {
                break;
            }
        }
    }
    console.log("Verifier Step 3: generate invariants for the given functions");
    let mutations: ((x: string) => string)[] = [(x) => x + "\n}", (x) => removeLastChar(x, "}")];
    let functionalRes = [];
    let setupFileName = fullSlugToContractId(setupContractId)[0];
    let setupContractOrigCode = getFileCode(ctx, setupFileName);
    let invariantIdx = 0;
    for (let vulnerability of vulnerabilities) {
        invariantIdx += 1;
        let { invPrompt, immediateCode } = await createPromptWithSetup(ctx, ragCtx, vulnerability, setupContractId, targetContractId);
        console.log("Generating invariant for vulnerability: " + vulnerability.vulnerableFunction, ` ${vulnerabilities.length - invariantIdx}/${vulnerabilities.length} vulnerabilities left`);
        let res = await generateAndPatchFromPrompt(ctx, 
                                                characterCtx,
                                                remappings,
                                                invPrompt,
                                                setupFileName,
                                                mutations,
                                                ((x) => setupContractOrigCode + "\n\n// BEGIN INVARIANTS\n\n" + x + "\n}"),
                                                ((id, content) => new Map([[id, content]])),
                                                ((id, content) => null));
        // Add documentation for res
        res = res.map((x) => {
            return `/** \nFunction: {{FUNCTION}}\n\n`.replace("{{FUNCTION}}",vulnerability.vulnerableFunction) +
                `Vulnerable Reason: {{REASON}}\n\n`.replace("REASON", vulnerability.vulnerabilityReason) + 
                `LLM Likelihood: {{Likelihood}}\n\n`.replace("{{Likelihood}}", vulnerability.vulnerabilityLikelihood) + 
                `What this invariant tries to do: {{Assertion}}\n*/\n\n`.replace("{{Assertion}}", vulnerability.vulnerabilityAssertion)
                + x;
        }); 
        functionalRes = functionalRes.concat(res)
    }
    
    console.log("Functional Invariants:", functionalRes)
    console.log("Verifier Stage finished... Writing to output")
    let content = setupContractOrigCode + "\n\n// BEGIN INVARIANTS\n\n" + functionalRes.map(
        (x, nth) => {
            x = x + "}";
            x = x.replace("GeneratedInvariants", "GeneratedInvariants" + nth)
            return x;
        }
    ).join('\n');
    content = removeLastChar(content, "}") + "}"
    let replacements = new Map([[setupFileName, content]]);
    console.log("Target Contract Id: " + targetContractId);
    let absPath = path.resolve( "results/" + targetContractId.split("/").pop() + "_output");
    console.log("Writing to folder: " + absPath);
    writeCtxToFolders(ctx, absPath, replacements, remappings);
}


async function generateSetupFile(ctx: ContractContext, remappings: string[], targetContractId: string) {
    // TODO: Enable user to choose a path
    let setupId = "script/" + fullSlugToContractId(targetContractId)[0].split(".sol")[0].replace("/", "_") + "_Invaraint.sol"
    let { promptSetup, immediateSetup } = createPromptForTarget(ctx, targetContractId);
    
    setupId += ":InvariantTest"
    let mutations = [(x: string) => removeLastChar(x, "}"), (x: string) => x + "\n}"]
    console.log("Remappings: " + remappings);
    let functionalRes = await generateAndPatchFromPrompt(ctx,
                                                        {result: "", ctx: []} as OpenAIContext,
                                                        remappings,
                                                        promptSetup, 
                                                        setupId, 
                                                        mutations,
                                                        ((x) => immediateSetup + "\n" + x + "}\n"), 
                                                        ((id, content) => null), 
                                                        ((id, content) => new Map([[id, content]])));
    let setupCode = immediateSetup + "\n" + functionalRes[0] + "}\n";
    return {
        setupId,
        setupCode
    }
}

async function generatedAndEvaluateVulnerability(ctx: ContractContext, targetContractId: string, publicFunctionId: string, nth: number, previousCtx: OpenAIContext, vulnerabilities: Vulnerability[]): Promise<OpenAIContext> {
    let vulnerabilityPrompt = createPromptForVunlerabilityAnalysis(ctx, targetContractId, publicFunctionId);
    // console.log(vulnerabilityPrompt);
    let vulnerabilityCtx = await openaiCompletion(vulnerabilityPrompt, nth, previousCtx.ctx, "user", [
        {
            type: "function",
            function: {
                name: "recordVulnerability",
                parameters: {
                    type: "object",
                    properties: {
                        vulnerableFunctionName: {
                            type: "string"
                        },
                        vulnerabilityDescription: {
                            type: "string",
                        },
                        vulnerabilityType: {
                            type: "string",
                            enum: VulnerabilityTypes
                        }
                    },
                    required: ["vulnerableFunctionName", "vulnerabilityDescription", "vulnerabilityType"]
                }
            }
        }
    ]);
    if (!vulnerabilityCtx.function_calls) {
        console.log("Failed to find vulnerabilities! Skipping ...");
        return null;
    };
    // For each vulnerability, evaluate it once -- give likelihood of it happening and describe how would you invariant test it
    let vulnerability = vulnerabilityTransformer(vulnerabilityCtx);
    let assertionPrompt = createPromptForVulnerabilityAssertion(ctx, vulnerability, targetContractId);
    // console.log(assertionPrompt);
    vulnerabilityCtx = await openaiCompletion(assertionPrompt, nth, previousCtx.ctx, "user", [
        {
                type: "function",
                function: {
                    name: "evaluateVulnerability",
                    parameters: {
                        type: "object",
                        properties: {
                            vulnerabilityAssertion: {
                                type: "string"
                            },
                            vulnerabilityLikelihood: {
                                type: "string",
                                enum: ["low", "medium", "high"]
                            }
                        },
                        required: ["vulnerabilityAssertion", "vulnerabilityLikelihood"]
                    }
                }
            }
    ]);
    if (!vulnerabilityCtx.function_calls) {
        console.log("Failed to evaluate vulnerabilities! Skipping ...");
        return null;
    }
    vulnerability = vulnerabilityEvaluationTransformer(vulnerability, vulnerabilityCtx);
    // console.log(vulnerability);
    // Skip low likelihood vulnerabilities
    if (vulnerability.vulnerabilityLikelihood === "low" || vulnerability.vulnerabilityLikelihood === "medium") {
        console.log("Vulnerability evaluated to low or medium! Skipping...");
        return null;
    }
    vulnerabilities.push(vulnerability);
    return vulnerabilityCtx;
}

async function generateAndPatchFromPrompt(ctx: ContractContext,
                                        openAIContext: OpenAIContext,
                                        remappings: string[],
                                        prompt: string, 
                                        id: string,
                                        mutations: ((x: string) => string)[],
                                        content_rule: ((x: string) => string), 
                                        replacements: ((id: string, content: string) => Map<any, string>), 
                                        additions:  ((id: string, content: string) => Map<any, string>))
{
    let res = await Promise.all(
        [0].map(async (x) => {
            return solidityTransformer(prompt, x, openAIContext.ctx)
        })
    );

    let functionalRes = [];
    let gptIndex = 6;

    for (let j = 0; j < res.length; j++) {
        let r = res[j];
        for (let i = 0; i < RETRIES; i++) {
            let content = content_rule(r.code.join('\n'));
            let out = await tryCompile(
                writeCtx(ctx, replacements(id, content), additions(id, content)),
                remappings, 
                ctx.compilerVersion, true) as {
                success: boolean,
                message: string,
                err: string
            }
            if (out.success) {
                functionalRes.push(r.code.join('\n'));
                break
            }
            if (out.err) {
                break;
            }
            console.log(`Using LLM to fix this invariant, attempt #${i}/${RETRIES}`);
            if (isParsingError(out.message)) {
                let fixed = false;
                for (let mutation of mutations) {
                    let content = content_rule(mutation(r.code.join('\n')));
                    const newOut = await tryCompile(writeCtx(ctx, replacements(id, content), additions(id, content)), remappings, ctx.compilerVersion, true) as {
                        success: boolean,
                        message: string,
                        err: string
                    }
                    if (newOut.success || !isParsingError(newOut.message)) {
                        fixed = true;
                        out = newOut;
                        r.code = [mutation(r.code.join('\n'))];
                        // console.log(newOut.message)
                        break;
                    }
                }
                // console.log("ParserError", "Fixed", fixed);
                // // @ts-nocheck
                if (!fixed) {
                    // console.log("ParserError", "Not fixed");
                    res[j] = await solidityTransformer(prompt, gptIndex);
                    r = res[j];
                    gptIndex += 1;
                }
            } else {
                const additionalPrompt = FIX_PROMPT.replace("{{FIX_GUIDELINES}}", FIX_GUIDELINES.join("\n")) + "\n\n" + out.message + "\n\n```solidity"
                const additionalRes = await solidityTransformer(additionalPrompt, gptIndex, r.ctx);
                // console.log(additionalRes.ctx)
                gptIndex += 1;
                res[j].code = additionalRes.code;
                res[j].ctx = additionalRes.ctx;
                r = res[j];
                // console.log("fixed....................")
            }
            
        }
    }
    return functionalRes;
}

function contractIdToFullSlug(contractId: ContractId) {
    return contractId[0] + ":" + contractId[1];
}

function fullSlugToContractId(fullSlug: string): ContractId {
    return fullSlug.split(":") as ContractId;
}

function functionIdToFullSlug(functionId: FunctionId) {
    return functionId[0] + ":" + functionId[1] + ":" + functionId[2];
}

function fullSlugToFunctionId(fullSlug: string): FunctionId {
    return fullSlug.split(":") as FunctionId;
}

// ContractId: ["xxx.sol", "contract_name"]
type ContractId = [string, string];
// FunctionId: ["xxx.sol", "contract_name", "function_name"]
type FunctionId = [string, string, string];
// ContractToBase: {"xxx.sol:contract_name" -> [["xxx.sol", "contract_name"]]}
type ContractToBase = Map<string, ContractId[]>;
// ContractToDeps: {"xxx.sol:contract_name" -> ["xxx.sol:contract_name"]}
type ContractToDeps = Map<string, string[]>;
// ContractToImports: {"xxx.sol:contract_name" -> ["import XXX from YYY"]}
type ContractToImports = Map<string, string[]>;
// ContractIdToContract: {"xxx.sol:contract_name" -> AST Node}
type ContractIdToContract = Map<string, ContractDefinition>;
// FunctionIdToFunction: {"xxx.sol:contract_name:function_name" -> AST Node}
type FunctionIdToFunction = Map<string, FunctionDefinition>;
// AllStateVars: {"xxx.sol:contract_name" -> ["xxx.sol:contract_name"]}
type ContractIdToSetupDeps = Map<string, string[]>;
// AllStateVars: {"xxx.sol:contract_name" -> state_var}
type AllStateVars = Map<string, string[]>;
// AllPublicFunctions: {"xxx.sol:contract_name" -> function_name} -- excludes private functions and constructors
type AllPublicFunctions = Map<string, string[]>;
// StateVarToContract: {"xxx.sol:contract_name:state_var" -> "xxx.sol:contract_name" (contract of that state var)}
type StateVarToContract = Map<string, string>;
type ContractContext = {
    contractToBase: ContractToBase,
    contractToConstructorDeps: ContractToDeps,
    contractToStateVarDeps: ContractToDeps,
    contractIdToContract: ContractIdToContract,
    functionIdToFunction: FunctionIdToFunction,
    contractToImportDeps: ContractToImports,
    contractIdToSetupDeps: ContractIdToSetupDeps,
    allStateVars: AllStateVars,
    AllPublicFunctions: AllPublicFunctions,
    stateVarToContract: StateVarToContract,
    compilerVersion: string,
    sourceUnits: SourceUnit[]
};


function rewritePrivateFields(contract: ContractDefinition) {
    contract.walk((node) => {
        if (node.type === "VariableDeclaration") {
            if ((node as any).visibility === "private") {
                (node as any).visibility = "public";
            }
        }
        if (node.type === "FunctionDefinition") {
            // only view and pure functions can be called
            if (!["view", "pure"].includes((node as any).stateMutability)) {
                return
            }
            if ((node as any).visibility === "private" || (node as any).visibility === "internal") {
                (node as any).visibility = "public";
            }
        }
    });
}

async function extractContext(compilation_result: CompileResult): Promise<ContractContext> {
    const reader = new ASTReader();
    const sourceUnits = reader.read(compilation_result.data);

    let contractToBase: ContractToBase = new Map();
    let contractToConstructorDeps: ContractToDeps = new Map();
    let contractToStateVarDeps: ContractToDeps = new Map();
    let contractToImportDeps: ContractToDeps = new Map();
    let contractIdToContract: ContractIdToContract = new Map();
    let functionIdToFunction: FunctionIdToFunction = new Map();
    let allStateVars: AllStateVars = new Map();
    let AllPublicFunctions: AllPublicFunctions = new Map();
    let stateVarToContract: StateVarToContract = new Map();
    let contractIdToSetupDeps: ContractIdToSetupDeps = new Map();

    for (const sourceUnit of sourceUnits) {
        // if (sourceUnit.absolutePath.includes("node_modules") || sourceUnit.absolutePath.includes("test") || sourceUnit.absolutePath.includes("lib/")) {
        // continue;
        // }
        for (const contract of sourceUnit.vContracts) {
            if (!(sourceUnit.absolutePath.includes("node_modules") || sourceUnit.absolutePath.includes("test") || sourceUnit.absolutePath.includes("lib/"))) {
                rewritePrivateFields(contract);
            }

            const contractId = contractIdToFullSlug([sourceUnit.absolutePath, contract.name]);
            contractIdToContract.set(contractId, contract);

            allStateVars.set(
                contractId,
                contract.vStateVariables
                    .map((x) => {
                        return x.name;
                    })
            );

            AllPublicFunctions.set(
                contractId,
                contract.vFunctions
                    .filter((f) => {
                        return (f.visibility != "internal" && f.visibility != "private" && f.name != "constructor" && !f.name.startsWith("_") && f.name != "");
                    })
                    .map((x) => {
                        const functionId = functionIdToFullSlug([sourceUnit.absolutePath, contract.name, x.name]);
                        functionIdToFunction.set(functionId, x);
                        return x.name;
                    })
            );


            contract.vStateVariables
                .map((x) => {
                    x.walk((node) => {
                        if (node.type === "IdentifierPath") {
                            let $ref = (node as IdentifierPath).vReferencedDeclaration
                            if ($ref) {
                                if ($ref.type === "ContractDefinition") {
                                    let contract = $ref as ContractDefinition
                                    let $parent = contract.parent;
                                    if ($parent) {
                                        if ($parent.type == "SourceUnit") {
                                            let parent = $parent as SourceUnit
                                            stateVarToContract.set(contractId + ":" + x.name, contractIdToFullSlug([parent.absolutePath, contract.name]));
                                        }
                                    }
                                    
                                }
                            }
                        }
                    })
                })


            contractToBase.set(
                contractId,
                contract.vLinearizedBaseContracts
                    .filter((x) => x.vScope.absolutePath !== sourceUnit.absolutePath || x.name !== contract.name)
                    .map((x) => {
                        return [x.vScope.absolutePath, x.name];
                    })
            );
            
            contractToConstructorDeps.set(
                contractId,
                (contract.vConstructor?.vParameters.vParameters
                    .map((x) => {
                        return x.typeString
                    })
                    .filter((x) => x.includes("contract") || x.includes("interface")) || [])
                    .map((x) => {
                        return x.split(" ")[1];
                    })
            );

            contractToStateVarDeps.set(
                contractId,
                contract.vStateVariables
                    .map((x) => {
                        return x.typeString;
                    })
                    .filter((x) => x.includes("contract") || x.includes("interface"))
                    .map((x) => {
                        return x.split(" ")[1];
                    })
            );

            contractIdToSetupDeps.set(
                contractId,
                // @ts-ignore
                contract.vFunctions
                    .filter((x) => x.name === "setUp")
                    .map((x) => {
                        let newContracts: string[] = [];

                        x.walk((node) => {
                            if (node.type === "IdentifierPath") {
                                let $ref = (node as IdentifierPath).vReferencedDeclaration
                                if ($ref) {
                                    if ($ref.type === "ContractDefinition") {
                                        newContracts.push((
                                            $ref as ContractDefinition
                                        ).name);
                                    }
                                }
                            }
                        })
                        return newContracts;
                    }).flat()
            );

            contractToImportDeps.set(
                contractId,
                sourceUnit.vImportDirectives
                    .map((x) => {
                        // Directly import library
                        if (x.file.startsWith("@")){
                            return x.file
                        }
                        return x.absolutePath;
                    })
            );
        }
    }


    return {
        contractToBase,
        contractToConstructorDeps,
        contractToStateVarDeps,
        contractIdToContract,
        functionIdToFunction,
        contractToImportDeps,
        contractIdToSetupDeps,
        AllPublicFunctions,
        allStateVars,
        stateVarToContract,
        compilerVersion: compilation_result.compilerVersion || LatestCompilerVersion,
        sourceUnits
    };
};

// Recursively get all functions invoked by a FunctionDefinition node
function getFunctionDefinitions(f: FunctionDefinition): Set<FunctionDefinition> {
    let relevantFunctions = new Set<FunctionDefinition>();
    // f.vBody.vStatements[0].vExpression.vArguments[0] ==> type Functioncall, has "agent.callbackWithCharge()"
    // f.vBody.vStatements[0].vExpression.vArguments[0].vCallee ==> type MemberAccess has "agent.callbackWithCharge"
    // f.vBody.vStatements[0].vExpression.vArguments[0].vCallee.vReferencedDeclaration ==> type FunctionDefinition has "function callbackWithCharge()" definition
    // f.vBody.vStatements[0].vExpression.vArguments[0].vCallee.vExpression ==> type Identifier has "agent" and the whole contract (hopefully)
    if (!f.vBody) {
      return relevantFunctions;
    }
    f.vBody.walk((node) => {
      if (node.type === "FunctionCall") {
        let functionCall = node as FunctionCall
        // Directly invoking a function
        if (functionCall.vCallee.type === "Identifier") {
          let referencedDeclaration = (functionCall.vCallee as Identifier).vReferencedDeclaration;
          // Skip if reference is a solidity internal identifier
          if (referencedDeclaration && referencedDeclaration.type == "FunctionDefinition") {
            let currentFunction = referencedDeclaration as FunctionDefinition
            // Ignore Foundry assertions and view functions
            if (!currentFunction.name.startsWith("assert") && !currentFunction.stateMutability.includes("view")){
              for (let relevantFunction of getFunctionDefinitions(currentFunction)) {
                relevantFunctions.add(relevantFunction);
              }
              relevantFunctions.add(currentFunction);
            }
          }
        }

        // Invoking a function in a contract
        if (functionCall.vCallee.type === "MemberAccess") {
          let referencedDeclaration = (functionCall.vCallee as MemberAccess).vReferencedDeclaration;
          // Skip if reference is a solidity internal identifier
          if (referencedDeclaration && referencedDeclaration.type == "FunctionDefinition") {
            let currentFunction = referencedDeclaration as FunctionDefinition
            // Ignore Foundry assertions
            if (!currentFunction.name.startsWith("assert") && !currentFunction.stateMutability.includes("view")){
              for (let relevantFunction of getFunctionDefinitions(currentFunction)) {
                relevantFunctions.add(relevantFunction);
              }
              relevantFunctions.add(currentFunction);
            }
          }
        }
      }
    })
    return relevantFunctions;
}

function collectRelevantContracts(context: ContractContext, contractId: string, maxLevel: number = 0) {
    let baseToContract: Map<string, ContractId[]> = new Map();
    let availableContracts: Map<string, ContractId[]> = new Map();

    // Recursively collect base contract -> inheriting contract mapping
    function collectBaseToContract(currentLevel: number) {
        if (currentLevel >= maxLevel) {
            return;
        }
        // Populate baseToContract by 1 more level
        context.contractToBase.forEach((bases, contract) => {
            bases.forEach((base) => {
                    if (!baseToContract.has(base[1])) {
                        baseToContract.set(base[1], []);
                    }
                    baseToContract.get(base[1])?.push(fullSlugToContractId(contract));
            });
        });
        
        // Now, baseToContract has one additional level. Update contractToBase accordingly
        baseToContract.forEach((contracts, base) => {
            contracts.forEach((contract) => {
                context.contractToBase.get(contractIdToFullSlug(contract))?.push(fullSlugToContractId(base));
            });
        })
        collectBaseToContract(currentLevel + 1);
    }

    collectBaseToContract(0);
    
    context.contractToBase.forEach((_, contract) => {
        const c = fullSlugToContractId(contract);
        if (!availableContracts.has(contract)) {
            availableContracts.set(c[1], []);
        }
        availableContracts.get(c[1])?.push(c);
    });

    // console.log(availableContracts)

    const constructorDeps = context.contractToConstructorDeps.get(contractId) || [];
    const constructoDepsContractId = constructorDeps
        .filter((x) => baseToContract.has(x))
        .map((x) => baseToContract.get(x) || [])
        .flat().concat(
            constructorDeps
                .filter((x) => availableContracts.has(x))
                .map((x) => availableContracts.get(x) || [])
                .flat()
        )

    // console.log(baseToContract);
    // find relevent contracts
    const stateVarDeps = context.contractToStateVarDeps.get(contractId) || [];
    const stateVarDepsContractId = stateVarDeps
        .filter((x) => baseToContract.has(x))
        .map((x) => baseToContract.get(x) || [])
        .flat().concat(
            stateVarDeps
                .filter((x) => availableContracts.has(x))
                .map((x) => availableContracts.get(x) || [])
                .flat()
        )
    
    const importDepsAbsolutePath = context.contractToImportDeps.get(contractId) || [];
    
    return {
        importDeps: importDepsAbsolutePath,
        constructorDeps: constructoDepsContractId,
        stateVarDeps: stateVarDepsContractId
    }
}


function collectRelevantDeps(ctx: ContractContext, slug: string, levels: number = 3): string[] {
    if (levels === 0) {
        return []
    }
    let bases = (ctx.contractToBase.get(slug) || []).map(x => {
        return contractIdToFullSlug(x);
    });
    let fullDeps = []
    let deps = (ctx.contractIdToSetupDeps.get(slug) || []);
    for (let [slug, contract] of ctx.contractIdToContract) {
        let contractId = fullSlugToContractId(slug);
        if (deps.includes(contractId[1])) {
            fullDeps.push(slug);
        }
    }
    let recursiveDeps = fullDeps.map((x) => collectRelevantDeps(ctx, x, levels - 1)).flat();
    return Array.from(new Set([...fullDeps, ...bases, ...recursiveDeps]));
}

const CHARACTER_GUIDELINES_BASE = `You are the best solidity auditor in the world.\n` + 
`Your task is to write invariant tests to uncover potentially vulnerable functions in solidity smart contracts.\n`;
function createPromptForCharacterGuidelines(ctx: ContractContext, targetContractId: string) {
    return CHARACTER_GUIDELINES_BASE;
}

const VULNERABILITY_ANALYSIS_BASE= `Please read the following contract and **call recordVulnerability tool for function \"{{FUNCTION_NAME}}\"** to report its potential vulnerability.\n{{CODE}}\n\n"` +
`Follow these guidelines in your analysis: \n{{GUIDELINES}}\n\n` + 
`The function vulnerabilities you are looking for must satisfy one of the following conditions: \n{{VulnerabilityTypes}}\n`;
function createPromptForVunlerabilityAnalysis(ctx: ContractContext, targetContractId: string, targetFunctionName: string) {
    // Respond in this format:
    //  -> Potentially vulnerable function name:
    //  -> Description of vulnerability
    const writer = new ASTWriter(
        DefaultASTWriterMapping,
        formatter,
        ctx.compilerVersion
    );
    let contractCode = writer.write(ctx.contractIdToContract.get(targetContractId));
    return VULNERABILITY_ANALYSIS_BASE.replace("{{FUNCTION_NAME}}", targetFunctionName).replace("{{CODE}}", contractCode).replace("{{GUIDELINES}}", VulnerabilityGenerationGuidelines.join("\n")).replace("{{VulnerabilityTypes}}", VulnerabilityTypes.join("\n"));
}

const VULNERABILITY_ASSERTION_BASE=`Our auditor has described the following potential vulnerability for the "{{FUNCTION_NAME}}" function in contract "{{CONTRACT_NAME}}". The contract souce code is provided for your reference: {{CODE}}\n\n` +
                                    `Vulnerability Type: {{TYPE}}\n\nVulnerability Description: {{DESCRIPTION}}\n\n` +
                                    `Your task is to evaluate this reported vulnerability, and **call evaluateVulnerability** tool to report your findings.\n` +
                                    `Following these guidelines in your analysis: \n{{GUIDELINES}}`;
function createPromptForVulnerabilityAssertion(ctx: ContractContext, vulnerability: Vulnerability, targetContractId: string) {
    const writer = new ASTWriter(
        DefaultASTWriterMapping,
        formatter,
        ctx.compilerVersion
    );
    let contractCode = writer.write(ctx.contractIdToContract.get(targetContractId));
    let contractName = fullSlugToContractId(targetContractId)[1];
    return VULNERABILITY_ASSERTION_BASE.replace("FUNCTION_NAME", vulnerability.vulnerableFunction).replace("{{CONTRACT_NAME}}", contractName).replace("{{CODE}}", contractCode).replace("{{DESCRIPTION}}", vulnerability.vulnerabilityReason).replace("{{TYPE}}", vulnerability.vulnerabilityType).replace("{{GUIDELINES}}", VulnerabilityEvaluationGuidelines.join("\n"));
}


const SETUP_PROMPT_BASE = `You are trying to write a setUp() function for the following smart contract code.\n{{CODE}}\n\n`;
const SETUP_PROMPT_DEPLOY = `In this setUp() function, you need to deploy the following contracts and properly set up the states by calling setter functions. \n{{DEPLOY}}\n\n`;
const SETUP_PROMPT_CODE = "\n\n```solidity\n \npragma solidity ^0.8.0;\n \n{{IMPORTS}}\n\ncontract InvariantTest is Test {\n {{TARGET}} \n // [Write setUp() function here]\n";
function createPromptForTarget(ctx: ContractContext, contractId: string) {
    let codeArr = [];
    let deployArr = [];
    let importArr = ["import \"forge-std/Test.sol\";"];
    const writer = new ASTWriter(
        DefaultASTWriterMapping,
        formatter,
        ctx.compilerVersion
    );
    
    const contractData = ctx.contractIdToContract.get(contractId);
    if (!contractData) {
        throw new Error("Contract not found");
    }
    const code = writer.write(contractData);
    codeArr.push(code);
    // Import the original contract
    importArr.push("import " + "\"" + contractId.split(":")[0] + "\";");
    // Deploy the contract under test as a variable!!
    // Add relevant contract code -- do not collect more than one level due to token limit
    let relevant_contracts = collectRelevantContracts(ctx, contractId, 0)
    let to_deploy = relevant_contracts.constructorDeps.concat(relevant_contracts.stateVarDeps).map((x) => x[0] + ":" + x[1])
    // Import everything that the original contract depends on
    relevant_contracts.importDeps.map((x) => {
        importArr.push("import \"" + x + "\";");
    })
    for (let deployId of to_deploy) {
        const deployData = ctx.contractIdToContract.get(deployId);
        if (!deployData) {
            throw new Error("Contract not found");
        }
        const code = writer.write(deployData);
        deployArr.push(code);
        // importArr.push("import \"" + deployId.split(":")[0] + "\";");
    }
    let promptSetup = SETUP_PROMPT_BASE.replace("{{CODE}}", codeArr.join("\n\n"))
    if (deployArr.length > 0) {
        promptSetup += SETUP_PROMPT_DEPLOY.replace("{{DEPLOY}}", deployArr.join("\n\n"))
    }
    let contractName = fullSlugToContractId(contractId)[1];
    let target = contractName + " " + contractName.toLowerCase() + ";"

    promptSetup += SETUP_PROMPT_CODE.replace("{{IMPORTS}}", importArr.join("\n")).replace("{{TARGET}}", target);
    // console.log(promptSetup);
    return {
        promptSetup,
        immediateSetup: promptSetup.split("```solidity\n")[1]
    }
}

function removeLastChar(str: string, char: string) {
    for (let i = str.length - 1; i >= 0; i--) {
        if (str[i] === char) {
            return str.slice(0, i);
        }
    }
    return str;
}

function replaceContractName(contract: ASTNode, newName: string) {
    let name = "Unknown";
    contract.walk((node) => {
        if (node.type === "ContractDefinition") {
            name = (node as ContractDefinition).name;
            (node as ContractDefinition).name = newName;
        }
    });
    return name;
}

async function llmSetUpFile(abi: Map<string, any[]>, ctx: ContractContext, remappings: string[], targetContractId: string) {
    // console.log("ABI: " + JSON.stringify(abi));
    let slugs = []
    for (let [key, _] of abi) {
        slugs.push(key);
    }
    console.log("Available setup files and contracts: \n" + slugs.join("\n"));
    let matchingTargets = slugs.filter((x) => x.includes(targetContractId));
    if (matchingTargets.length === 0) {
        throw new Error("Target file not found");
    }
    if (matchingTargets.length > 1) {
        throw new Error("Multiple target files found");
    }

    targetContractId = matchingTargets[0];
    let targetContract= ctx.contractIdToContract.get(targetContractId);
    if (!targetContract) {
        throw new Error("Target contract not found");
    }
    let isSetup = false;
    targetContract.walk((node) => {
        if (node.type === "FunctionDefinition") {
            let name = (node as FunctionDefinition).name;
            if (name == "setUp") {
                isSetup = true;
            }
        }
    });
    if (!isSetup) {
        // console.log("Generating a setUp file for", targetContractId);
        // Replace matchingSetupsContractId with newly generated ID
        // Add code for newly generated setup in context
        let { setupId, setupCode } = await generateSetupFile(ctx, remappings, targetContractId)
        return {
            setupId, 
            setupCode
        }
    }
    throw new Error("Found setUp() function in target file, please specify it as setup file instead.")
}

const INVARIANT_TEST_GUIDELINES = [
    "1. Invariant tests are executed after each transaction. If all assertions in the invariant tests hold, then no vulnerability occured. If an assertion is broken, then one vulnerability has occured.",
    "2. Invariant tests are executed outside of the call to the function-under-test, you can only access STATE VARIABLES and View FUNCTIONS. You DO NOT have access to function parameters or local variables.",
    "3. Your invariant is executed immediately after a call to the function-under-test, and you are checking the effects it had on state variables and/or view function results.",
    "4. Invariant tests should start with 'invariant_' prefix."
]
const BASE_PROMPT_INV_OFFCHAIN = `**Finish an invariant-testing smart contract that contains at least one invariant test** for function "{{TARGET_FUNCTION}}" in the contract "{{TARGET_CONTRACT}}". Please refer to the source code of the contract and its parent contracts \n{{CODE}}\n\n.` +
    `To assist you, our auditor has described a possible vulnerability in the function: \n{{VULNERABILITY_DESCRIPTION}}\n. Our auditor also provided recommendations for writing the invariant test: "{{VULNERABILITY_ASSERTION}}"\n\n` +
    `Here are some examples of invariant tests written for other code snippets. Please note that the sample invariants are for **reference only** and you **should not directly copy them**. \n\n{{RAG_EXAMPLES}}\n\n` +
    `Follow these guidelines when you generate the invariant test: {{INVARIANT_TEST_GUIDELINES}}. A starter code for the contract is already given. Please **finish writing this contract and return the whole contract**` +
    "\n\n```solidity\n\n{{SETUP_FILE}}\n\n // [ADD ADDITIONAL STATE VARIABLES YOU NEED HERE] \n\n // [ADD INVARIANTS HERE]  \n}\n```";
async function createPromptWithSetup(ctx: ContractContext, ragCtx: RagContext, vulnerability: Vulnerability, setupContractId: string, targetContractId: string) {
    const writer = new ASTWriter(
        DefaultASTWriterMapping,
        formatter,
        ctx.compilerVersion
    );

    let setupContract = ctx.contractIdToContract.get(setupContractId);
    if (!setupContract) {
        throw new Error("Setup contract not found");
    }
    let origName = replaceContractName(setupContract, "GeneratedInvariants");
    let setupCode = removeLastChar(writer.write(setupContract), "}")
    setupContract.name = origName;
    let invPrompt = BASE_PROMPT_INV_OFFCHAIN.replace("{{SETUP_FILE}}", setupCode).replace("{{TARGET_FUNCTION}}", vulnerability.vulnerableFunction).replace("{{VULNERABILITY_DESCRIPTION}}", vulnerability.vulnerabilityReason).replace("{{TARGET_CONTRACT}}", fullSlugToContractId(targetContractId)[1]).replace("{{VULNERABILITY_ASSERTION}}", vulnerability.vulnerabilityAssertion).replace("{{INVARIANT_TEST_GUIDELINES}}", INVARIANT_TEST_GUIDELINES.join("\n"));

    let deps = collectRelevantDeps(
        ctx,
        targetContractId,
        0
    )

    deps.push(targetContractId)

    let depsCode = deps.map((x) => {
        const contractData = ctx.contractIdToContract.get(x);
        if (!contractData) {
            throw new Error("Contract not found");
        }
        return writer.write(contractData);
    }).join("\n\n");
    // Get all functions invoked by the function definition here
    let relevantFunctions = getFunctionDefinitions(ctx.functionIdToFunction.get(targetContractId + ":" + vulnerability.vulnerableFunction));
    let functionCode = Array.from(relevantFunctions).map((f) => {
        return writer.write(f);
      }).join("\n");
    let referenceInvariants = await ragCtx.retriever.invoke(functionCode);

    let index = 0;
    let referenceInvCode = referenceInvariants.map((x) => {
        index += 1;
        return `Code Example ${index}:\n\n` + x.metadata.code + `\n\nInvariant Example for Code Example ${index}:\n\n` + x.metadata.invariant;
    }).join("\n\n")
    invPrompt = invPrompt.replace("{{CODE}}", depsCode);
    invPrompt = invPrompt.replace("{{RAG_EXAMPLES}}", referenceInvCode);
    // console.log(invPrompt);


    // @ts-ignore
    return {
        invPrompt,
        immediateCode: invPrompt.split("```solidity\n")[1].split(
            "// [ADD INVARIANTS HERE]"
        )[0]
    }
}


export { llmWorkflowOffchain, llmSetUpFile, writeCtxToFolders, extractContext, ContractContext, getFunctionDefinitions};
