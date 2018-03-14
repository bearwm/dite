import * as path from 'path';

import { CRYPTO } from '../constants/crypto.constants';
import { Test } from '../interfaces/test.interface';
import { ValidateFile } from '../interfaces/validate.interface';
import { GPP_COMPILATOR, TEMPORARY_PATH } from '../paths';
import { OS, PLATFORM } from '../platform';
import { CLIService } from './cli.service';
import { CryptoService } from './crypto.service';
import { FileService } from './file.service';

const TEMP = {
    PATH: TEMPORARY_PATH,
    IN: '.in',
    OUT: 'content.out',
    CPP: 'content.cpp',
    SPLIT_KEY: 'endIterationDite',
};

export class ValidateService {
    public async validate(files: ValidateFile) {
        const fileService = new FileService();
        const cryptoService = new CryptoService();

        const decryptedTest = cryptoService.decrypt(await fileService.fileContent(files.test.path));

        let testContent: Test;
        try {
            testContent = JSON.parse(decryptedTest);
        } catch (e) {
            throw new Error('Invalid test.');
        }

        if (testContent.success !== cryptoService.md5(CRYPTO.password)) {
            throw new Error('Invalid test.');
        }

        const softwareContent = await fileService.fileContent(files.software.path);

        const evaluationSoftware = this.transformSoft(softwareContent, testContent.data.length);

        await fileService.saveContent(path.join(TEMP.PATH, TEMP.CPP), evaluationSoftware);

        return this.evaluate(testContent);
    }

    private async evaluate(data: Test) {
        const fileService = new FileService();

        for (let i = 0; i < data.data.length; i++) {
            await fileService.saveContent(path.join(TEMP.PATH, i + TEMP.IN), data.data[i].input);
        }
        await fileService.saveContent(path.join(TEMP.PATH, TEMP.OUT), ``);

        const result = await this.evaluateSoftware();
        return data.data.map((test, count) => test.output.some((item, index) => item === result[count][index] ));
    }

    private async evaluateSoftware() {
        const cliService = new CLIService();
        const fileService = new FileService();

        const extension = PLATFORM === OS.MACOS ? 'out' : 'exe';
        const compilator = PLATFORM === OS.MACOS ? GPP_COMPILATOR.MACOS : GPP_COMPILATOR.WINDOWS;

        await cliService.execute(compilator, [TEMP.PATH], ['-g', TEMP.CPP, '-o', `${TEMP.CPP}.${extension}`]);
        await cliService.execute(`./${TEMP.CPP}.${extension}`, [TEMP.PATH], []);

        const result = await fileService.fileContent(path.join(TEMP.PATH, TEMP.OUT));
        const results = result.split(TEMP.SPLIT_KEY);
        return results.map(response => response.replace(TEMP.SPLIT_KEY, '').split(/\s+/g));
    }

    private transformSoft(content: string, count: number): string {
        const requiredContent = `
        #include <fstream>
        #include <string>
        std::ifstream cin;
        std::ofstream cout("content.out");
        `;

        const iterator = `
            int main() {
                for(int i = 0; i < ${count}; i++) {
                    string fileNameDite = std::to_string(i);
                    fileNameDite += "${TEMP.IN}";
                    cin.open(fileNameDite.c_str());
                    diteMain();
                    if(i != ${count - 1}) {
                        cout << "${TEMP.SPLIT_KEY}";
                    }
                    cin.close();
                }
                return 0;
            }
        `;

        return requiredContent + content
            .replace('#include <fstream>', '')
            .replace('#include <iostream>', '')
            .replace('#include <string>', '')
            .replace('std::cin', 'cin')
            .replace('std::cout', 'cout')
            .replace('main()', 'diteMain()')
            + iterator;
    }
}
