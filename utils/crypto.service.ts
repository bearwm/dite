import * as crypto from 'crypto';

import { CRYPTO } from '../constants/crypto.constants';

export class CryptoService {
    public encrypt(content: string): string {
        const cipher = crypto.createCipher(CRYPTO.algorithm, CRYPTO.password);
        return cipher.update(content, 'utf8', 'hex') + cipher.final('hex');
    }

    public decrypt(content: string): string {
        const decipher = crypto.createDecipher(CRYPTO.algorithm, CRYPTO.password);
        return decipher.update(content, 'hex', 'utf8') + decipher.final('utf8')
    }

    public md5(content: string): string {
        return crypto.createHash('md5').update(content).digest('hex')
    }
}
