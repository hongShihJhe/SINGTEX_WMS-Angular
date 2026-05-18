import { InjectionToken } from "@angular/core";

export const IAlertToken = new InjectionToken<IAlert>('IAlert');

export interface IAlert{
    Alert(message: string, callback?: Function ): void
    AlertSucc(message: string, callback?: Function ): void
    AlertError(message: string, callback?: Function ): void
    AlertWarn(message: string, callback?: Function ): void
    Confirm(message: string, callback?: Function ): void
    ConfirmSucc(message: string, callback?: Function ): void
    ConfirmError(message: string, callback?: Function ): void
    ConfirmWarn(message: string, callback?: Function ): void
}