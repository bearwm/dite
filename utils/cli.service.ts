import { spawn, ChildProcess } from 'child_process';
import * as path from 'path';

import { OS, PLATFORM } from '../platform';

export class CLIService {
    public execute(command: string, dir: string[], parameters?: string[]) {
        return this.parseData(spawn(command, parameters, { cwd: path.join(...dir) }));
    }

    private parseData(process: ChildProcess): Promise<string> {
        return new Promise((resolve, reject) => {
            let response = ``;
            process.stdout.on('data', data => response += data.toString());
            process.on('close', code => resolve(response));
        });
    }
}
