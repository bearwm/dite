import * as fs from 'fs';

export class FileService {
    public fileContent(path: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(path.toString(), (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data.toString());
            });
        });
    }

    public saveContent(path: string, data?: any): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, data, err => {
                if (err) {
                    return reject(err);
                }
                return resolve();
            });
        });
    }
}
