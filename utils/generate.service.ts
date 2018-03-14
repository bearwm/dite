import { dialog } from 'electron';

import { CRYPTO } from '../constants/crypto.constants';
import { EXTENSIONS } from '../enum/extension.constants';
import { Test, TestFile } from '../interfaces/test.interface';
import { CryptoService } from './crypto.service';
import { FileService } from './file.service';

export class GenerateService {
    public async generate(tests: TestFile[]) {
        const fileService = new FileService();
        const cryptoService = new CryptoService();

        const data = [];
        for (const test of tests) {
            try {
                const input = await fileService.fileContent(test.input.path);
                const output = await fileService.fileContent(test.output.path);
                data.push({
                    input: input.split(/\s+/g),
                    output: output.split(/\s+/g),
                });
            } catch (e) {
                throw e;
            }
        }

        const textTest: Test = {
            success: cryptoService.md5(CRYPTO.password),
            data: data,
        };
        const encryptedTest = cryptoService.encrypt(JSON.stringify(textTest));

        dialog.showSaveDialog({ title: 'test' }, async path => {
            if (!path) {
                throw new Error('Path not selected');
            }
            await fileService.saveContent(`${path}.${EXTENSIONS.TEST}`, encryptedTest);
        });
    }
}
