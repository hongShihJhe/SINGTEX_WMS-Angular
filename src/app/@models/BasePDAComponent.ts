export abstract class BasePDAComponent{

    table: any
    tableOptions: any = 
    {
        columnDefs: [
            { targets: '_all', orderable: false, defaultContent: '' },
        ],
        language: {
            url: document.baseURI + 'DataTables/zh-HANT.json',
        },
        pageLength: 50,
    }

    /**
     * merge base options 
     * @param options 
     * @returns merged options
     */
    setTableOptions(options: any){
        return Object.assign(this.tableOptions, options)
    }

    get rows_count() {
        if (this.table) {
            return this.table.rows().count()
        }
        return 0
    }

    get scanned_count() {
        if (this.table) {
            return this.table.rows((idx: any, data: any) => data._confirm === 'Y').count()
        }
        return 0
    }

    get scan_completed() {
        if (!this.table) {
            return null
        }
        if (this.rows_count > 0) {
            let hasNotConfirmedData = this.table.row((idx: any, data: any) => data._confirm !== 'Y').data()
            return !hasNotConfirmedData
        }
        return false
    }

    get table_data(): any[] {
        if (this.table) {
            return this.table.rows().data().toArray()
        }
        return []
    }

    get table_data_confimed() {
        return this.table_data.filter((item: any) => item._confirm === 'Y')
    }

    abstract fetchTableData(): void

    addTableRow(data: any[]){
        this.table.rows.add(data).draw()
    }

    clearTable(){
        this.table.clear().draw()
    }
    
    refreshTable(){
        this.clearTable()
        this.fetchTableData()
    }

    /**
     * 
     * @param row DataTables API object
     */

    deleteTableRow(row: any){
        row.remove().draw()
    }

    /**
     * 
     * @param row DataTables API object
     * @param rowData 
     */
    updateTableRow(row: any, rowData: any){
        row.data(rowData).draw()
    }
}