import { Injectable } from '@angular/core';

import { Sender } from '../../../bus/sender';
import { Messages } from '../../../enum/messages.enum';
import { TestFile } from '../../../interfaces/test.interface';

@Injectable()
export class AdminService {
    public async generate(files: TestFile[]): Promise<any> {
        return Sender.getInstance().send(Messages.GENERATE_TEST, files);
    }
}
