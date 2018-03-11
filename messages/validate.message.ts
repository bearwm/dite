import { Message } from '../interfaces/message.interface';
import { ValidateFile } from '../interfaces/validate.interface';
import { ValidateService } from '../utils/validate.service';

export class ValidateMessage implements Message {
    public call(files: ValidateFile) {
        const validateService = new ValidateService();
        return validateService.validate(files);
    }
}
