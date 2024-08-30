import { forge_build_json } from './helpers/forge';
import { hardhat_build_json } from './helpers/hardhat';
import * as path from 'path';
import { globSync } from 'glob';
import { exec } from 'child_process';
import { exit } from 'process';
import * as fs from 'fs';
import { createHash } from 'crypto';
import { checkSolcSelectInstalled } from './utils';
import { compileJsonData } from 'solc-typed-ast';

const hardhatConfigRegex = /hardhat\.config\.(js|ts)$/;
const forgeConfigRegex = /(forge|foundry)\.toml$/;

async function auto_detect(task_dir: string) {
    const files = fs.readdirSync(task_dir, {recursive: true});

    if (files.some((file) => forgeConfigRegex.test(file))) {
        return 'forge';
    }

    if (files.some((file) => hardhatConfigRegex.test(file))) {
        return 'hardhat';
    }

    console.log('Unknown project, treating everything *.sol in this folder as smart contract.');
    return 'solidity_folder';
}

async function build(project: string, task_dir: string, compiler_version: string, supressErrors: boolean = false) {
    if (project === 'hardhat') {
        let promise = new Promise((resolve, reject) => {
            handle_build_info_task(task_dir, hardhat_build_json, resolve);
        });
        return await promise;
    } else if (project === 'forge') {
        let files = fs.readdirSync(task_dir);
        if (!files.some((x) => forgeConfigRegex.test(x))) {
            // Recursively try to build the first subdirectory that has foundry.toml file
            for (let file of files) {
                file = task_dir + "/" + file
                if (fs.lstatSync(file).isDirectory() && fs.readdirSync(file, {recursive: true}).some((x) => forgeConfigRegex.test(x))) {
                    let results = await build(project, file, compiler_version);
                    return results;
                }
            }
        }
        // Located the subdir with foundry.toml file, or there is no foundry.toml so create one
        let { success, contents } = await forge_build_json(task_dir) as { success: boolean, contents: any[] };
        if (!success) {
            console.error('Build failed...');
            return [{success: false}];
        }
        let results = [];
        for (let content of contents) {
            let result = await handleBuildResult(content["output"], content["solcVersion"], content["input"], null, process.hrtime());
            results.push({
                remappings: content["input"]["settings"]["remappings"],
                ...result,
            });
        }
        return results;
    } else if (project === 'solidity_folder') {
        let promise = new Promise((resolve, reject) => {
            if (!compiler_version) {
                console.error('Compiler version not specified');
                exit(1);
            }
            handle_multi_build(task_dir, compiler_version, resolve);
        });
        return await promise;
    } else {
        console.error('Unknown project type', project);
        exit(1);
    }
}

async function handle_build_info_task(task_dir: string, build_func: any, resolve: any) {
    try {
        let result = await build_func(task_dir);
        if (!result.success) {
            console.error('Build failed', result.err);
            exit(1);
        }
        let results = [];
        for (let data of result.contents) {
            let version_finder = /^(.+?)\+commit\.[0-9a-z]+/;
            let version = version_finder.exec(data['solcLongVersion']);
            let result = await work_on_json('v' + (version || [NaN])[0], data['input'], '');
            results.push(result);
        }
        resolve(results);
    } catch (error) {
        console.error(error);
        exit(1);
    }
}

async function handle_multi_build(task_dir: string, compiler_version: string, resolve: any) {
    let files = globSync(path.join(task_dir, '**/*.sol'));
    let build_sources = {} as { [key: string]: { content: string } };

    for (let file of files) {
        let is_dir = fs.lstatSync(file).isDirectory();
        if (is_dir) {
            continue;
        }
        let content = fs.readFileSync(file, 'utf8');
        build_sources[file] = { content };
    }

    let remappings = [];
    let remappings_file = path.join(task_dir, 'remappings.txt');
    if (fs.existsSync(remappings_file)) {
        let remappings_lines = fs.readFileSync(remappings_file, 'utf8').split('\n');
        for (let line of remappings_lines) {
            if (line.trim().length > 0) {
                remappings.push(line.trim());
            }
        }
    }

    let result = await work_on_json(
        compiler_version,
        {
            language: 'Solidity',
            sources: build_sources,
            settings: {
                remappings,
            },
        },
        '',
    );
    resolve(result);
}

function generate_settings(original = {}) {
    let basic = original as { [key: string]: any };
    basic['outputSelection'] = {
        '*': {
            '*': [],
            '': [],
        },
    };
    basic['outputSelection']['*']['*'].push('ast');
    basic['outputSelection']['*']['*'].push('legacyAST');
    basic['outputSelection']['*'][''].push('ast');
    basic['outputSelection']['*'][''].push('legacyAST');
    basic['outputSelection']['*']['*'].push('evm.deployedBytecode.sourceMap');
    basic['outputSelection']['*']['*'].push('evm.bytecode');
    basic['outputSelection']['*']['*'].push('evm.deployedBytecode');
    basic['outputSelection']['*']['*'].push('abi');
    return basic;
}

async function handleBuildResult(output: {
    errors: any[];
    contracts: {
        [key: string]: {
            [key: string]: {
                abi: any;
            };
        };
    };
}, compiler_version: string, compiler_json: any, contract_name: string | null, starting: any, supressErrors: boolean = false) {
    for (let error of output?.errors || []) {
        if (error['severity'] === 'error' ) {
            if (!supressErrors) {
                console.log(`Compilation failed ${error["formattedMessage"]}`)
            }
            return { message: error["formattedMessage"], success: false }
        }
    }
    let abi = null;
    if (contract_name) {
        for (let [fn, contract] of Object.entries(output['contracts'])) {
            for (let [_contract_name, contract_info] of Object.entries(contract)) {
                if (_contract_name === contract_name) {
                    abi = contract_info['abi'];
                }
            }
        }
    } else {
        abi = new Map();
        for (let [fn, contract] of Object.entries(output['contracts'])) {
            for (let [contract_name, contract_info] of Object.entries(contract)) {
                abi.set(`${fn}:${contract_name}`, contract_info['abi']);
            }
        }
    }

    let ast = (await compileJsonData("sample.json", output, compiler_version, []))
    ast.compilerVersion = compiler_version
    return {
        success: true,
        abi,
        ast,
    };
}

async function work_on_json(compiler_version: string, compiler_json: {
    language: string;
    sources: { [key: string]: { content: string } };
    settings: { [key: string]: any };
}, contract_name: string | null, supressErrors: boolean = false) {
    let promise = new Promise(async (resolve, reject) => {
        let starting = process.hrtime();
        if (!fs.existsSync('.tmp')) {
            fs.mkdirSync('.tmp');
        }

        const contractHash = createHash('md5').update(JSON.stringify(compiler_json)).digest('hex');
        let currentFile = `.tmp/compile_config_${contractHash}.json`;
        compiler_json['settings'] = generate_settings((compiler_json['settings']));

        if (!fs.existsSync(currentFile)) {
            fs.writeFileSync(currentFile, JSON.stringify(compiler_json));
        }

        starting = process.hrtime();

        const versionRegex = /v(\d+\.\d+\.\d+)/;
        const match = compiler_version.match(versionRegex);
        let versionNumber;
        if (match) {
            versionNumber = match[1];
        } else {
            console.log('Could not find version number');
        }
        const outputJson = `.tmp/compile_output_${contractHash}.json`;

        if (!fs.existsSync(outputJson)) {
            if (checkSolcSelectInstalled()) {
                exec(
                    !supressErrors ? `solc-select use ${versionNumber} --always-install && ` : '' + 
                    `
                
                solc --standard-json < ${currentFile} > ${outputJson}`,
                    async (err, stdout, stderr) => {
                        if (err) {
                            console.log('Error loading solc', stderr);
                            resolve({ success: false, err: stderr });
                            return;
                        }

                        console.log(stdout);
                        
                        let output;
                        try {
                            output = JSON.parse(fs.readFileSync(outputJson, 'utf8'));
                        } catch (e) {
                            resolve({ success: false, err: 'solc output parsing failed' });
                            return;
                        }
                        const result = await handleBuildResult(
                            output,
                            compiler_version,
                            compiler_json,
                            contract_name,
                            starting,
                            supressErrors
                        );

                        resolve({
                            remappings: compiler_json.settings['remappings'],
                            ...result,
                        });
                    },
                );
            } else {
                exec(
                    `python3 -m venv .venv && source .venv/bin/activate &&
                    pip3 install solc-select &&
                    solc-select use ${versionNumber} --always-install && 
                    solc --standard-json < ${currentFile} > ${outputJson}`,
                    async (err, stdout, stderr) => {
                        if (err) {
                            console.log('Error loading solc', stderr);
                            resolve({ success: false, err: stderr });
                            return;
                        }

                        console.log(stdout);

                        let output;
                        try {
                            output = JSON.parse(fs.readFileSync(outputJson, 'utf8'));
                        } catch (e) {
                            console.log(outputJson)
                            console.log("Error parsing output", e);
                            resolve({ success: false, err: 'solc output parsing failed' });
                            return;
                        }
                        const result = await handleBuildResult(
                            output,
                            compiler_version,
                            compiler_json,
                            contract_name,
                            starting,
                            supressErrors
                        );
                        resolve({
                            remappings: compiler_json.settings['remappings'],
                            ...result,
                        });
                    },
                );
            }
        } else {
            let output;
            try {
                output = JSON.parse(fs.readFileSync(outputJson, 'utf8'));
            } catch (e) {
                console.log(outputJson)
                console.log("Error parsing output", e);
                resolve({ success: false, err: 'solc output parsing failed' });
                return;
            }
            const result = await handleBuildResult(output, compiler_version, compiler_json, contract_name, starting, supressErrors);
            resolve({
                remappings: compiler_json.settings['remappings'],
                ...result,
            });
        }
    });

    return await promise;
}


export { auto_detect, build, work_on_json };

