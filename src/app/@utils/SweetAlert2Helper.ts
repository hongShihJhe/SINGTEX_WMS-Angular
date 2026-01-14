import Swal, { SweetAlertOptions } from "sweetalert2"





export class SweetAlert2Helper {
    static Alert(message: string, callback?: Function) {
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

    static AlertSucc(message: string, callback?: Function) {
        let options: SweetAlertOptions = {
            title: message,
            icon: 'success',
            confirmButtonText: '確認',
            returnFocus: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        } 
        return Swal.fire(options)
            .then(function (result) {
                if (result.isConfirmed) {
                    if (callback) {
                        callback()
                    }
                }
                return result
            })

    }

    static AlertWarn(message: string, callback?: Function) {
        let options: SweetAlertOptions = {
            title: message,
            icon: 'warning',
            confirmButtonText: '確認',
            returnFocus: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        } 
        return Swal.fire(options)
            .then(function (result) {
                if (result.isConfirmed) {
                    if (callback) {
                        callback()
                    }
                }
                return result
            })

    }

    static AlertError(message: string, callback?: Function ) {
        let options: SweetAlertOptions = {
            title: message,
            icon: 'error',
            confirmButtonText: '確認',
            returnFocus: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        } 
        return Swal.fire(options)
            .then(function (result) {
                if (result.isConfirmed) {
                    if (callback) {
                        callback()
                    }
                }
                return result
            })
    }

    static Confirm(message: string, callback: Function) {
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

    static ConfirmWarn(message: string, callback: Function) {
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