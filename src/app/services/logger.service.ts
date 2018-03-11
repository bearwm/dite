import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
    public info(message: string, data?: any) {
        console.log(`Info: ${message}`, data)
    }

    public warning(message: string, data?: any) {
        console.log(`Warning: ${message}`, data);
    }

    public error(message: string, data?: any) {
        console.log(`Error: ${message}`, data);
    }
}
