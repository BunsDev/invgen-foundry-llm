import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

function hasYarn(cwd = process.cwd()) {
    return fs.existsSync(path.resolve(cwd, 'yarn.lock'));
}

function hasPnpm(cwd = process.cwd()) {
    return fs.existsSync(path.resolve(cwd, 'pnpm-lock.yaml'));
}

function checkSolcSelectInstalled() {
    try {
        execSync('solc-select versions');
        return true;
    } catch (error) {
        return false;
    }
}

export { checkSolcSelectInstalled, hasYarn, hasPnpm };