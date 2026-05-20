export class StringUtil {
    static IsNullOrWhiteSpace(str?: string){
        return !str || !str.trim()
    }
}