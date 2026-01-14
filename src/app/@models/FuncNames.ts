export class FuncNames {
    private static data: any = {
        "cimt302a": "胚布收貨",
        "cimt302a0": "胚布點收",
        "cimt302a1": "上架作業",
        "cimt302a2": "已點收未上架",
        "transfer": "調撥",
        "aimt324": "胚布調撥",
        "container_binding": "載體綁定",
        "container_change": "載體更換",
        "container_transfer": "載體移轉",
        "csfi514": "發領料",
        "csfi5140": "發胚布",
        "csfi5141": "領胚布",
        "csfi514_query": "已發未領查詢",
        "asft700": "出站報工",
        "asft700_in": "上機作業",
        "asft700_query": "工單速查",
        "asft700_container_log": "報工載體紀錄",
        "container_binding1": "儲位綁定",
        "container_binding2": "載體綁定",
        "container_binding_location2": "布車綁定",
        "work_report": "現場報工",
        "work_report1": "配布資料補登",
        "asft620": "成品入庫",
        "asft6201": "完工入庫",
        "asft6202": "倉庫點收",
        "asft6203": "倉庫上架",
        "asft6204": "倉庫入庫與點收",
        "asft6205": "查詢",
        "search": "查詢",
        "search_container": "載體查詢",
        "search_imgs": "製造批號或布疋號查詢",
        "Search02": "工卡查詢",
        "Search04": "載具使用紀錄",
        "csfi301_query": "工單登記",
    }

    static get(name:string): string{
        return this.data[name] || ''
    }
}
