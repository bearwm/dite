import { Injectable } from '@angular/core';

import { Sender } from '../../../bus/sender';
import { Messages } from '../../../enum/messages.enum';
import { ValidateFile } from '../../../interfaces/validate.interface';

@Injectable()
export class UserService {
    public validate(files: ValidateFile): Promise<any> {
        return Sender.getInstance().sendSync(Messages.VALIDATE, files);
    }
}
