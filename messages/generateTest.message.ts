import { Message } from '../interfaces/message.interface';
import { TestFile } from '../interfaces/test.interface';
import { GenerateService } from '../utils/generate.service';

export class GenerateTestMessage implements Message {
    public call(files: TestFile[]) {
        const generateService = new GenerateService();
        return generateService.generate(files);
    }
}
