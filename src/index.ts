import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { auto_detect, build } from './compiler';
import { llmWorkflowOffchain, llmSetUpFile, writeCtxToFolders, extractContext } from './ast';
import { readdir, writeFileSync } from 'fs';
import {ingestProject, getRagContext} from './weaviate_ingest'
import * as path from "path";

const argv = yargs(hideBin(process.argv))
    .command(
        '$0 <project>',
        'Build a project',
        (yargs) => {
            yargs
                .positional('project', {
                    describe: 'Name of the project to build',
                    type: 'string',
                })
                .demandOption(
                    ['project'],
                    'Please provide the project argument to proceed'
                );
        },
        async (argv) => {
            if (argv.project) {
                let ragCtx = await getRagContext();
                // Learn from samples to populate RAG DB
                if (argv.retrain) {
                    await new Promise<void>((resolve, reject) => {
                        readdir("invariant_dataset", (async (err, repos) => {
                            if (err) {
                                throw new Error(err.message);
                            }
                            for (let repo of repos) {
                                repo = "invariant_dataset/" + repo;
                                try {
                                    const ty = await auto_detect(repo as string);
                                    console.log(`Auto-detected project type: ${ty}`);
                                    let res = await build(ty, repo as string, argv.compilerVersion as string) as {
                                        success: boolean,
                                        abi: Map<string, any[]>,
                                        ast: any,
                                        remappings: string[],
                                    }[];
                                    for (let r of res) {
                                        if (!r.success) {
                                            console.log("Failed to build RAG project: " + repo);
                                            continue;
                                        }
                                        let ctx = await extractContext(r.ast);
                                        await ingestProject(r.ast, ctx, ragCtx);
                                    }
                                } catch(e) {
                                    console.log("Failed to build RAG project: " + repo);
                                    console.log(e.message);
                                }
                            };
                            resolve();
                    }))});
                }
                // Parse target project
                const ty = await auto_detect(argv.project as string);
                console.log(`Auto-detected project type: ${ty}`);
                let res = await build(ty, argv.project as string, argv.compilerVersion as string) as {
                    success: boolean,
                    abi: Map<string, any[]>,
                    ast: any,
                    remappings: string[],
                }[];
                let targetContractId = argv.targetFile as string;
                let setupContractId = argv.setupFile? argv.setupFile as string : "";
                let res_count = 0;
                res.forEach(
                    async ({ success, abi, ast, remappings }) => {
                        try {
                            console.log("Built and processing content #" + res_count);
                            res_count += 1;
                            if (!success) throw new Error('Failed to build project');
                            let ctx = await extractContext(ast);
                            // console.log("Target Project ABI: " + JSON.stringify(abi));
                            // console.log("Target Project AST: " + JSON.stringify(ast));
                            // Generate setUp() contract for targetFile, if not provided
                            if (setupContractId == "") {
                                console.log("remappings: " + JSON.stringify(remappings));
                                let absPath = path.resolve( "results/" + targetContractId.split("/").pop() + "_output");
                                let setupRes = await llmSetUpFile(abi, ctx, remappings, targetContractId);
                                writeCtxToFolders(ctx, absPath, null, remappings);
                                let setUpAbsPath = absPath + "/" +  setupRes.setupId.split(":")[0];
                                writeFileSync(setUpAbsPath, setupRes.setupCode);
                                let rebuild = await build(ty, absPath, argv.compilerVersion as string) as {
                                    success: boolean,
                                    abi: Map<string, any[]>,
                                    ast: any,
                                    remappings: string[],
                                }[];
                                abi = rebuild[0].abi;
                                ctx = await extractContext(rebuild[0].ast);
                                remappings = rebuild[0].remappings;
                                setupContractId = setupRes.setupId;
                            }
                            await llmWorkflowOffchain(
                                abi,
                                ctx,
                                ragCtx,
                                remappings,
                                setupContractId,
                                targetContractId
                            );
                        } catch(e) {
                            console.log("Processing content failed with message: " + e);
                        }
                    }
                )
            }
        }
    )
    .option('project-type', {
        alias: 't',
        type: 'string',
        description: 'Type of the project',
    })
    .option('compiler-version', {
        alias: 'c',
        type: 'string',
        description: 'Specify the compiler version to use',
    })
    .option('setup-file', {
        alias: 'sf',
        type: 'string',
        description: 'Specify the setup file to use',
    })
    .option('target-file', {
        alias: 'tf',
        type: 'string',
        description: 'Specify the target file to use',
    })
    .option('retrain', {
        alias: 'r',
        type: 'boolean',
        description: 'Reload RAG database from invariant_dataset',
    })
    .help().argv;
