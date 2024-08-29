// const { exec } = require('child_process');
// const { v4: uuidv4 } = require('uuid');
// const path = require('path');
// const fs = require('fs');
// const { hasYarn, hasPnpm } = require('../utils');

import { exec } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { hasYarn, hasPnpm } from '../utils';

async function hardhat_build_json(project_dir: string) {
    let promise = new Promise((resolve, reject) => {
        try {
            console.log('Running hardhat compile');
            let process;

            exec(`cd ${project_dir}`, (error, stdout) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                const currentDir = stdout.trim();

                if (hasYarn(currentDir)) {
                    process = exec(`yarn && yarn hardhat compile`);
                    console.log('This project uses yarn');
                } else if (hasPnpm(currentDir)) {
                    process = exec(`pnpm i && pnpm hardhat compile`);
                    console.log('This project uses pnpm');
                } else {
                    process = exec(`npm i && npx hardhat compile`);
                    console.log('This project uses npm');
                }

                process?.stdout?.on('data', (data) => {
                    console.info(data.toString());
                });

                process?.stderr?.on('data', (data) => {
                    console.log(data.toString());
                });

                process.on('exit', (code) => {
                    console.log('Hardhat compile finished');
                    let build_info_dir = path.join(project_dir, 'artifacts/build-info');

                    if (!fs.existsSync(build_info_dir)) {
                        fs.mkdirSync(build_info_dir);
                    }

                    let files = fs.readdirSync(build_info_dir);
                    let contents = [];
                    for (let file of files) {
                        if (!file.endsWith('.json')) {
                            continue;
                        }
                        let fp = path.join(build_info_dir, file);
                        let content = fs.readFileSync(fp, 'utf8');
                        let contentParsed = JSON.parse(content) as { [key: string]: any };

                        // remove key "output"
                        delete contentParsed['output'];

                        contents.push(contentParsed);
                    }
                    resolve({
                        success: true,
                        contents
                    });
                });
            });
        } catch (err) {
            console.log(err);
            resolve({
                success: false,
                err: err
            });
        }
    });

    return await promise;
}
export { hardhat_build_json };