import { IAlert } from '../@interfaces/IAlert';

export class AlertStatic {

    static alertObject?: IAlert

    static setObject(alertObject: IAlert){
        this.alertObject = alertObject
    }

    static Alert(message: string, callback?: Function): void {
        this.alertObject?.Alert(message, callback)
    }
    static AlertSucc(message: string, callback?: Function): void {
        this.alertObject?.AlertSucc(message, callback)
    }
    static AlertError(message: string, callback?: Function): void {
        this.alertObject?.AlertError(message, callback)
    }
    static AlertWarn(message: string, callback?: Function): void {
        this.alertObject?.AlertWarn(message, callback)
    }
    static Confirm(message: string, callback?: Function): void {
    }
    static ConfirmSucc(message: string, callback?: Function): void {
    }
    static ConfirmError(message: string, callback?: Function): void {
    }
    static ConfirmWarn(message: string, callback?: Function): void {
    }

}