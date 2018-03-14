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
    IN: 'content.in',
    OUT: 'content.out',
    CPP: 'content.cpp',
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

        const evaluationSoftware = this.transformSoft(softwareContent);

        await fileService.saveContent(path.join(TEMP.PATH, TEMP.CPP), evaluationSoftware);

        return this.evaluate(testContent);
    }

    private async evaluate(data: Test) {
        const fileService = new FileService();

        const results = [];
        for (const test of data.data) {
            await fileService.saveContent(path.join(TEMP.PATH, TEMP.IN), test.input);
            await fileService.saveContent(path.join(TEMP.PATH, TEMP.OUT), ``);

            const result = await this.evaluateSoftware();
            const coincidence = test.output.some((item, index) => item === result[index]);
            results.push(coincidence);
        }

        return results;
    }

    private async evaluateSoftware() {
        const cliService = new CLIService();
        const fileService = new FileService();

        const extension = PLATFORM === OS.MACOS ? 'out' : 'exe';
        const compilator = PLATFORM === OS.MACOS ? GPP_COMPILATOR.MACOS : GPP_COMPILATOR.WINDOWS;

        // g++ -g -Wall -I/Users/mworkg/Desktop/dite/resources/darwin/g++/lib content.cpp -o content.cpp.out
        await cliService.execute(compilator, [TEMP.PATH], ['-g', TEMP.CPP, '-o', `${TEMP.CPP}.${extension}`]);
        await cliService.execute(`./${TEMP.CPP}.${extension}`, [TEMP.PATH], []);

        const result = await fileService.fileContent(path.join(TEMP.PATH, TEMP.OUT));
        return result.split(' ');
    }

    private transformSoft(content: string): string {
        const requiredContent = `
        #include <fstream>
        std::fstream cin("content.in");
        std::fstream cout("content.out");
        `;

        return requiredContent + content
            .replace('#include <fstream>', '')
            .replace('#include <iostream>', '')
            .replace('std::cin', 'cin')
            .replace('std::cout', 'cout');
    }
}
