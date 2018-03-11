import { Messages } from '../enum/messages.enum';

export interface Data {
    message: Messages;
    data?: any;
}

export interface SyncData extends Data {
    key: string;
}
