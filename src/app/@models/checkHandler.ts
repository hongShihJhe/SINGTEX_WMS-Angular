import { SubmitResult } from "./SubmitResult"

/**
 * 責任鏈模式，如果檢查成功資料交給下個檢查物件，檢查失敗則返回結果
 */
export class checkHandler<T>{
    protected next?: checkHandler<T>
    protected func?: (data: T) => Promise<SubmitResult>

    constructor(func: (data: T) => Promise<SubmitResult>){
        this.func = func
    }

    setNext(next: checkHandler<T>){
        this.next = next
        return this
    }

    handleFunc(data: T) {
        return new Promise<SubmitResult>((resolve, reject) => {
            if (this.func) {
                this.func(data).then(res => {
                    if (res.succ) {
                        if (this.next) {
                            resolve(this.next.handleFunc(data))
                        } else {
                            resolve(res)
                        }
                    } else {
                        resolve(res)
                    }
                })
            }
        })
    }
}