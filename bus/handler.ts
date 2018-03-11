import { Messages } from '../enum/messages.enum';
import { Data, SyncData } from '../interfaces/data.interface';
import { Message } from '../interfaces/message.interface';
import { GenerateTestMessage } from '../messages/generateTest.message';
import { ValidateMessage } from '../messages/validate.message';

const TIMEOUT = 20 * 1000;

export class Handler {
    private static _instance: Handler;

    private handler: Electron.IpcMain;

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    private constructor() { }

    public init(ipcMain: Electron.IpcMain) {
        this.handler = ipcMain;
        this.handle();
        this.handleSync();
    }

    private handle() {
        this.handler.on('r2m', async (event, data: Data) => {
            await this.getMessage(data.message).call(data.data);
        });
    }

    private handleSync() {
        this.handler.on('r2m-sync', async (event, data: SyncData) => {
            setTimeout(() => {
                event.sender.send(`r2m-response-${data.key}`, new Error('Timeout response.'));
            }, TIMEOUT);
            try {
                const response = await this.getMessage(data.message).call(data.data);
                event.sender.send(`r2m-response-${data.key}`, response);
            } catch (e) {
                event.sender.send(`r2m-response-${data.key}`, { error: e.toString() });
            }
        });
    }

    private getMessage(message: Messages): Message {
        switch (message) {
            case Messages.GENERATE_TEST:
                return new GenerateTestMessage();
            case Messages.VALIDATE:
                return new ValidateMessage();
        }
    }
}
