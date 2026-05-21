import { PDAFunction } from "./PDAFunction";

export class PDAFunctionData {
    static data: PDAFunction[] = [
        { func_code: "cimt302a", func_name: "胚布收貨", parent: undefined },
        { func_code: "cimt302a0", func_name: "胚布點收", parent: "cimt302a" },
        { func_code: "cimt302a1", func_name: "上架作業", parent: "cimt302a" },
        { func_code: "cimt302a2", func_name: "已點收未上架", parent: "cimt302a" },
        { func_code: "aimt324", func_name: "調撥", parent: undefined },
        { func_code: "aimt3240", func_name: "胚布調撥", parent: "aimt324" },
        { func_code: "aimt3241", func_name: "載體更換", parent: "aimt324" },
        { func_code: "aimt3242", func_name: "載體移轉", parent: "aimt324" },
        { func_code: "aimt3243", func_name: "載體綁定", parent: "aimt324" },
        { func_code: "csfi514", func_name: "發領料", parent: undefined },
        { func_code: "csfi5140", func_name: "發胚布", parent: "csfi514" },
        { func_code: "csfi5141", func_name: "領胚布", parent: "csfi514" },
        { func_code: "csfi5142", func_name: "載體綁定", parent: "csfi514" },
        { func_code: "csfi5143", func_name: "已發未領查詢", parent: "csfi514" },
        { func_code: "asft620", func_name: "成品入庫", parent: undefined },
        { func_code: "asft6200", func_name: "完工入庫", parent: "asft620" },
        { func_code: "asft6201", func_name: "倉庫點收", parent: "asft620" },
        { func_code: "asft6202", func_name: "倉庫上架", parent: "asft620" },
        { func_code: "asft6203", func_name: "倉庫入庫與點收", parent: "asft620" },
        { func_code: "asft6204", func_name: "查詢", parent: "asft620" },
        { func_code: "asft700", func_name: "現場報工", parent: undefined },
        { func_code: "asft7000", func_name: "布車綁定", parent: "asft700" },
        { func_code: "asft7001", func_name: "報工載體紀錄", parent: "asft700" },
        { func_code: "asft7002", func_name: "上機作業", parent: "asft700" },
        { func_code: "asft7003", func_name: "出站報工", parent: "asft700" },
        { func_code: "search", func_name: "查詢", parent: undefined },
        { func_code: "search0", func_name: "載體查詢", parent: "search" },
        { func_code: "search1", func_name: "製造批號或布疋號查詢", parent: "search" },
        { func_code: "csfi301", func_name: "工單登記", parent: 'csfi301' },
    ]

    static getName(func_code?: string) {
        let find = this.data.find(o => o.func_code === func_code)
        return find?.func_name || func_code
    } 

    static getChildren(func_code?: string){
        return this.data.filter(o => o.parent === func_code)
    }

    static isParent(func_code: string){
        let find = this.data.find(o => o.func_code === func_code)
        if (!find){
            return undefined
        }

        if (find.parent){
            return false
        } else{
            return true
        }
    }
}