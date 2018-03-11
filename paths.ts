import * as path from 'path';
import * as fs from 'fs';

export const TEMPORARY_PATH = path.join(__dirname, 'temp');

const args = process.argv.slice(1);
const SERVE = args.some(val => val === '--serve');
const DEBUG = args.some(val => val === '--DEBUG');

const RESOURCES_FOLDER = SERVE && !DEBUG
    ? path.join(__dirname, '..', 'resources')
    : path.join(__dirname, '..');

export const GPP_COMPILATOR = path.join(RESOURCES_FOLDER, 'windows', 'g++', 'bin', 'g++.exe');

export function initTemporaryPath() {
    if (!fs.existsSync(TEMPORARY_PATH)) {
        fs.mkdirSync(TEMPORARY_PATH);
    }
}
