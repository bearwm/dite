import { Injectable } from '@angular/core';

@Injectable()
export class FileService {
    public getExtension(fileName: string) {
        const EXTENSION_REG_EX = /\.[0-9a-z]{1,5}$/i;
        return fileName.match(EXTENSION_REG_EX)[0];
    }
}
