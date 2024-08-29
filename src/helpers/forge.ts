// const { exec } = require('child_process');
// const { v4: uuidv4 } = require('uuid');
// const path = require('path');
// const fs = require('fs');

import { exec } from 'child_process';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

async function forge_build_json(project_dir: string) {
    let build_info_dir = `build-info-${uuidv4()}`;
    let task_dir = path.join(project_dir, build_info_dir);
    let cmd = `forge build --build-info --build-info-path ${build_info_dir}`// + " --force";
    if (!fs.existsSync(project_dir + "/foundry.toml")) {
        cmd = "forge config > foundry.toml && " + cmd
    }
    // if (fs.existsSync(project_dir + "/Makefile")) {
    //     cmd = "make && " + cmd
    // }
    // if (fs.existsSync(project_dir + "/package.json")) {
    //     cmd = "npm install && " + cmd
    // }
    let promise = new Promise((resolve, reject) => {
        try {
            // TODO: call make here if Makefile exists
            console.log("Running build for: " + project_dir + " " + cmd);
            let process = exec(`cd ${project_dir} && ` + cmd);
            process?.stdout?.on('data', (data) => {
                console.info(data.toString());
            });

            process?.stderr?.on('data', (data) => {
                console.log(data.toString());
            });
            process.on('exit', (code) => {
                if (!fs.existsSync(task_dir)) {
                    resolve({
                        success: false,
                        err: "Build info not found"
                    });
                    return;
                }
                let files = fs.readdirSync(task_dir);
                let contents = [];
                for (let file of files) {
                    if (!file.endsWith('.json')) {
                        continue;
                    }
                    let fp = path.join(task_dir, file);
                    let content = fs.readFileSync(fp, 'utf8');
                    content = JSON.parse(content);
                    contents.push(content);
                }
                resolve({
                    success: true,
                    contents
                });
            });
        } catch (err) {
            resolve({
                success: false,
                err: err
            });
        }
    });

    return await promise;
}

export { forge_build_json };