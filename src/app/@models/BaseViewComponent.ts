import { FormOpFailState } from "./FormOpFailState";
import { FormOpSuccState } from "./FormOpSuccState";
import { SubmitResult, SubmitResultWithData } from "./SubmitResult";



export class BaseViewComponent {
    submitting = false
    succState = new FormOpSuccState();
    failState = new FormOpFailState();

    constructor(){
        
    }

    /**
     * control submitting prop with promise
     * @param promise 
     * @returns 
     */
    submittingDecorator(promise: any) {
        this.submitting = true
        promise.finally(() => {
            this.submitting = false
        })
        return promise
    }

    /**
     * handle result and determine to call succState.getListCallback or failState.getListCallback
     * @param promise 
     * @returns 
     */

    handleGetListPromise(promise: Promise<SubmitResultWithData<any>>){
        return promise.then(res => {
            if (res.succ){
                this.succState.getListCallback(res)
            } else {
                this.failState.getListCallback(res)
            }
        })
    }

    /**
     * handle result and determine to call succState.addCallback or failState.addCallback
     * @param promise 
     * @returns 
     */

    handleAddPromise(promise: Promise<SubmitResult>){
        return this.submittingDecorator(promise.then(res => {
            if (res.succ){
                this.succState.addCallback(res)
            } else {
                this.failState.addCallback(res)
            }
        }))
    }

    /**
     * handle result and determine to call succState.updateCallback or failState.updateCallback
     * @param promise 
     * @returns 
     */
    handleUpdatePromise(promise: Promise<SubmitResult>){
        return this.submittingDecorator(promise.then(res => {
            if (res.succ){
                this.succState.updateCallback(res)
            } else {
                this.failState.updateCallback(res)
            }
        }))
    }

    /**
     * handle result and determine to call succState.deleteCallback or failState.deleteCallback
     * @param promise 
     * @returns 
     */

    handleDeletePromise(promise: Promise<SubmitResult>){
        return promise.then(res => {
            if (res.succ){
                this.succState.deleteCallback(res)
            } else {
                this.failState.deleteCallback(res)
            }
        })
    }

}