export class DataTableHelper {

    static checkRowNull(row: any) {
        return row[0].length === 0
    }

    static getRow(table: any, props: string[], value: any) {
        let result
        for (let prop of props) {
            let row = table.row((idx: any, data: any) => data[prop] == value)
            if (!this.checkRowNull(row)) {
                result = row
                break;
            }
        }
        return result
    }
}