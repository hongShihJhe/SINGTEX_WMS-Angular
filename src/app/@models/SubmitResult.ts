export class SubmitResult {
    succ = true
    code?: string
    message = ''
}

export class SubmitResultWithData<T> extends SubmitResult {
    data?: T
}