import { EventEmitter } from '@angular/core';

import { Events } from '../../../enum/events.enum';

export class EventService {
    private static instance: EventService;
    public event: EventEmitter<{ type: Events, data: any }> = new EventEmitter();

    public static getInstance() {
        return this.instance || (this.instance = new this());
    }

    private constructor() { }

    public emitEvent(type: Events, data?: any) {
        this.event.emit({ type: type, data: data ? data : null });
    }
}
