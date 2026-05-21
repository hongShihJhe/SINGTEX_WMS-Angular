export class FuncNames {
    private static data: any = {
        "cimt302a": "胚布收貨",
        "cimt302a0": "胚布點收",
        "cimt302a1": "上架作業",
        "cimt302a2": "已點收未上架",
        "aimt324": "調撥",
        "aimt3240": "胚布調撥",
        "aimt3241": "載體更換",
        "aimt3242": "載體移轉",
        "aimt3243": "載體綁定",
        "csfi514": "發領料",
        "csfi5140": "發胚布",
        "csfi5141": "領胚布",
        "csfi5142": "載體綁定",
        "csfi5143": "已發未領查詢",
        "asft700": "現場報工",
        "asft7000": "布車綁定",
        "asft7001": "報工載體紀錄",
        "asft7002": "上機作業",
        "asft7003": "出站報工",
        "container_binding1": "儲位綁定",
        "container_binding2": "載體綁定",
        "work_report1": "配布資料補登",
        "asft620": "成品入庫",
        "asft6200": "完工入庫",
        "asft6201": "倉庫點收",
        "asft6202": "倉庫上架",
        "asft6203": "倉庫入庫與點收",
        "asft6204": "查詢",
        "search": "查詢",
        "search0": "載體查詢",
        "search1": "製造批號或布疋號查詢",
        "csfi301": "工單登記",
    }

    static get(name:string): string{
        return this.data[name] || name
    }
}
