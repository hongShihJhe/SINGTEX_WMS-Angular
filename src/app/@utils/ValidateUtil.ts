import { StringUtil } from "./StringUtil";

export class ValidateUtil {
    static IsOnlyNumber(str: string){
        if (!str || !str.trim()){
            return false
        }
        var reg = /^0-9/g
        return !reg.test(str)
    }
}