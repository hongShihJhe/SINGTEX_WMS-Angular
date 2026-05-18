export class StringUtil {
    static IsWhiteOrSpace(str?: string){
        return !str || !str.trim()
    }
}