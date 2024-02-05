import * as CryptoJS from 'crypto-js';

export function loginSignature(email: string, password: string) {
    try {
        const message = email + ':' + password;
        const hash = CryptoJS.SHA256(message);

        return hash.toString();
    } catch (err) {
        return '';
    }
}
