export class ConfirmationUtil {

    static fromValue(value: number): string {
        switch(value) {
            case 1: return 'Received';
            case 2: return 'Received and confirmed';
            case 3: return 'Received and rejected';
            default: return 'Unconfirmed';
        }
    }
}
