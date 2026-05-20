export class SubmitResult {
    succ = true
    code?: string
    message?: string 
}

export class SubmitResultWithData<T> extends SubmitResult {
    data?: T
}