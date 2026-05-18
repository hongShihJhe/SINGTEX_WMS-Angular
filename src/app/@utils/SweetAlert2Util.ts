import Swal, { SweetAlertOptions } from "sweetalert2";
import { IAlert } from "../@interfaces/IAlert";

export class SweetAlert2Util implements IAlert {
    Alert(message: string, callback?: Function): void {
        let options = {
            title: message,
            confirmButtonText: '確認',
            returnFocus: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        }
        Swal.fire(options)
            .then(function (result) {
                if (result.isConfirmed) {
                    if (callback) {
                        callback()
                    }
                }
                return result
            })
    }
    AlertSucc(message: string, callback?: Function): void {
        let options: SweetAlertOptions = {
            title: message,
            icon: 'success',
            confirmButtonText: '確認',
            returnFocus: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        }
        Swal.fire(options)
            .then(function (result) {
                if (result.isConfirmed) {
                    if (callback) {
                        callback()
                    }
                }
                return result
            })
    }
    AlertError(message: string, callback?: Function): void {
        let options: SweetAlertOptions = {
            title: message,
            icon: 'error',
            confirmButtonText: '確認',
            returnFocus: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        }
        Swal.fire(options)
            .then(function (result) {
                if (result.isConfirmed) {
                    if (callback) {
                        callback()
                    }
                }
                return result
            })
    }
    AlertWarn(message: string, callback?: Function): void {
        let options: SweetAlertOptions = {
            title: message,
            icon: 'warning',
            confirmButtonText: '確認',
            returnFocus: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        }
        Swal.fire(options)
            .then(function (result) {
                if (result.isConfirmed) {
                    if (callback) {
                        callback()
                    }
                }
                return result
            })
    }
    Confirm(message: string, callback?: Function): void {
        let options = {
                    title: message,
                    showCancelButton: true,
                    confirmButtonText: '確認',
                    cancelButtonText: '取消',
                    returnFocus: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }
                Swal.fire(options)
                    .then(function (result) {
                        if (result.isConfirmed) {
                            if (callback) {
                                callback()
                            }
                        }
                        return result
                    })
    }
    ConfirmSucc(message: string, callback?: Function): void {
        let options: SweetAlertOptions = {
                    title: message,
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: '確認',
                    cancelButtonText: '取消',
                    returnFocus: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }
                Swal.fire(options)
                    .then(function (result) {
                        if (result.isConfirmed) {
                            if (callback) {
                                callback()
                            }
                        }
                        return result
                    })
    }
    ConfirmError(message: string, callback?: Function): void {
        let options: SweetAlertOptions = {
                    title: message,
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonText: '確認',
                    cancelButtonText: '取消',
                    returnFocus: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }
                Swal.fire(options)
                    .then(function (result) {
                        if (result.isConfirmed) {
                            if (callback) {
                                callback()
                            }
                        }
                        return result
                    })
    }
    ConfirmWarn(message: string, callback?: Function): void {
        let options: SweetAlertOptions = {
                    title: message,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '確認',
                    cancelButtonText: '取消',
                    returnFocus: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                }
                Swal.fire(options)
                    .then(function (result) {
                        if (result.isConfirmed) {
                            if (callback) {
                                callback()
                            }
                        }
                        return result
                    })
    }
}