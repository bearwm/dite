import { CustomFile } from './file.interface';

export interface TestFile {
    input?: CustomFile;
    output?: CustomFile;
}

export interface Test {
    success: string;
    data: {
        input: string[];
        output: string[];
    }[];
}
