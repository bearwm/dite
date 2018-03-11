import { EventService } from 'app/services/event.service';
import { ipcRenderer } from 'electron';

import { Events } from '../enum/events.enum';
import { Messages } from '../enum/messages.enum';

export class Sender {
    private static _instance: Sender;

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }

    private constructor() { }

    public send(message: Messages, data?: any): void {
        ipcRenderer.send('r2m', { message: message, data: data });
    }

    public sendSync<T>(message: Messages, data?: any): Promise<T> {
        EventService.getInstance().emitEvent(Events.Loading, true);
        return new Promise((resolve, reject) => {
            const key = this.generateKey();
            ipcRenderer.once(`r2m-response-${key}`, (event, cb) => {
                EventService.getInstance().emitEvent(Events.Loading, false);
                cb.error ? reject(cb) : resolve(cb);
            });
            ipcRenderer.send('r2m-sync', { message: message, key: key, data: data });
        });
    }

    private generateKey(): string {
        return Math.random().toString(36).substr(2, 5);
    }
}
