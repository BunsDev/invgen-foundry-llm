import OpenAI from "openai";
import { OpenAIEmbeddings } from "@langchain/openai"
import {
    readFileSync,
    writeFileSync,
    existsSync,
    mkdirSync
} from "fs";

import { sha256 } from "js-sha256";
import { ChatCompletionCreateParamsNonStreaming, ChatCompletionMessageToolCall } from "openai/resources";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

type OpenAIContext = { result: string, ctx: any, function_calls?: ChatCompletionMessageToolCall[]};
type Vulnerability = { vulnerableFunction: string, vulnerabilityReason: string, vulnerabilityType: string, vulnerabilityAssertion?: string, vulnerabilityLikelihood?: string };

async function openaiCompletion(prompt: string, nth = 0, ctx = [], role = "user", functions=[]): Promise<OpenAIContext> {
    if (!existsSync(".cache/")) mkdirSync(".cache/");
    let hash = sha256(prompt + JSON.stringify(ctx));
    let newCtx = [
        ...ctx,
        {
            "role": role,
            "content": prompt
        },
    ];
    if (existsSync(`.cache/${hash}-${nth}-response`)) {
        let result = readFileSync(`.cache/${hash}-${nth}-response`, "utf-8");
        var openAIContext: OpenAIContext = {
            result,
            ctx: newCtx
        }
        // TODO: load tool call info here
        if (existsSync(`.cache/${hash}-${nth}-tools`)) {
            openAIContext.function_calls = JSON.parse(readFileSync(`.cache/${hash}-${nth}-tools`, "utf-8"));
        }
        newCtx.push({
            "role": "assistant",
            "content": result,
        });

        return openAIContext;
    }

    var apiParams: ChatCompletionCreateParamsNonStreaming = {
        model: "gpt-3.5-turbo",
        messages: [
            ...ctx,
            {
                "role": "user",
                "content": prompt
            },
        ],
        temperature: 1,
        max_tokens: 1500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    };

    if (functions?.length) {
        apiParams.tools = functions;
    }

    const response = await openai.chat.completions.create(apiParams);
    let result = response.choices[0].message.content || '';
    let function_calls: ChatCompletionMessageToolCall[] = response.choices[0].message.tool_calls || [];
    writeFileSync(`.cache/${hash}-${nth}-response`, response.choices[0].message.content || '', {
        encoding: "utf-8",
        flag: "w+"
    });
    writeFileSync(`.cache/${hash}-${nth}-tools`, JSON.stringify(function_calls) || '', {
        encoding: "utf-8",
        flag: "w+"
    });
    newCtx.push({
        "role": "assistant",
        "content": result,
    });
    return {
        result,
        ctx: newCtx,
        function_calls: function_calls
    };
}

function vulnerabilityTransformer(vulnerabilityCtx: OpenAIContext): Vulnerability {
    let vulnerabilityInfo = JSON.parse(vulnerabilityCtx.function_calls[0].function.arguments);
    return {
        vulnerableFunction: vulnerabilityInfo["vulnerableFunctionName"], 
        vulnerabilityReason: vulnerabilityInfo["vulnerabilityDescription"],
        vulnerabilityType: vulnerabilityInfo["vulnerabilityType"]
    };
}

function vulnerabilityEvaluationTransformer(vulnerability: Vulnerability, vulnerabilityCtx: OpenAIContext): Vulnerability {
    let vulnerabilityEvaluationInfo = JSON.parse(vulnerabilityCtx.function_calls[0].function.arguments);
    return {
        vulnerableFunction: vulnerability.vulnerableFunction,
        vulnerabilityReason: vulnerability.vulnerabilityReason,
        vulnerabilityType: vulnerability.vulnerabilityType,
        vulnerabilityAssertion: vulnerabilityEvaluationInfo["vulnerabilityAssertion"],
        vulnerabilityLikelihood: vulnerabilityEvaluationInfo["vulnerabilityLikelihood"]
    }
}


async function solidityTransformer(input: string, nth = 0, ctx = []): Promise<{ code: string[], ctx: any }> {
    let { result, ctx: newCtx } = await openaiCompletion(input, nth, ctx);
    if (result === null) return {
        code: [],
        ctx: newCtx
    };
    let insideSolidityCode = false;
    let lines = result.split("\n");
    let newLines = [];
    let newComments = [];

    let transformedCode = []

    if (!result.includes("```solidity")) {
        return {
            code: [result.replace(/```/g, "").replace(/\d+\. function/g, "function")],
            ctx: newCtx
        }
    }

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("```solidity")) {
            insideSolidityCode = true;
        } else if (lines[i].includes("```")) {
            insideSolidityCode = false;
            let joinedCode = newComments.join("\n") + "\n" + newLines.join("\n");
            transformedCode.push(joinedCode.replace(/\d+\. function/g, "function"));
        } else if (insideSolidityCode) {
            newLines.push(lines[i]);
        } else if (!insideSolidityCode) {
            newComments.push("// " + lines[i]);
        }
    }
    return { code: transformedCode || [result], ctx: newCtx }
}

function getOpenAIEmbedding() {
    return new OpenAIEmbeddings({apiKey: process.env.OPENAI_API_KEY});
}


export { solidityTransformer, getOpenAIEmbedding, openaiCompletion, OpenAIContext, vulnerabilityTransformer, vulnerabilityEvaluationTransformer, Vulnerability};