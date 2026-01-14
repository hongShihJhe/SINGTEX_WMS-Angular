import { ContainerService } from './../../@services/container-service';
import { Aimt324Service } from './../../@services/aimt324-service';
import { AfterViewInit, Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { ScanModal } from "../scan-modal/scan-modal";
import { FormsModule } from '@angular/forms';
import { DataTableHelper } from '../../@utils/DataTableHelper';
import { SweetAlert2Helper } from '../../@utils/SweetAlert2Helper';
import { Cimt302a0Service } from '../../@services/cimt302a0-service';

@Component({
  standalone: true,
  selector: 'app-aimt324',
  imports: [ScanModal, FormsModule],
  templateUrl: './aimt324.html',
  styleUrl: './aimt324.scss',
})

export class Aimt324 implements OnInit, AfterViewInit {
  table: any
  pageLength = 50
  inputA01?: string
  inputA02?: string
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
  get table_data_confimed(): any[] {
    return this.table_data.filter((item: any) => item._confirm === 'Y')
  }



  @ViewChild('table') tableRef!: ElementRef
  @ViewChild('scanImgsModal') scanImgsModal!: ScanModal
  @ViewChild('scanContainerModal') scanContainerModal!: ScanModal

  constructor(private aimt324Service: Aimt324Service, private containerService: ContainerService) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.init_table()
    this.scanContainerEvent()
    this.cancelConfirmedRowEvent()
    this.deleteRowEvent()
  }

  init_table() {
    let self = this
    this.table = $(this.tableRef.nativeElement).DataTable({
      processing: true,
      searching: false,
      serverSide: false,
      paging: false,
      stateSave: false,
      // ajax: {
      //   type: 'post',
      //   url: '/cimt302a0.json',
      //   data: function (d: any) {
      //     d.A01 = self.inputA01
      //   }
      // },
      columnDefs: [
        { targets: '_all', orderable: false, defaultContent: '' },
      ],
      order: [[1, 'asc']], // order 
      columns: [
        {
          data: '_confirm', 'title': '確認', visible: false,
          className: 'text-center align-middle',
          render: function (data: any, type: any, row: any, meta: any) {
            var result = ''
            if (data === 'Y') {
              result = 'V'
            }
            return result
          }
        },
        { data: 'RVBS04', visible: false, 'title': '製造批號' },
        { data: 'TA_RVBS14', visible: false, 'title': '布疋號' },
        { data: 'IMGS01', visible: false, 'title': '料號' },
        { data: 'IMGS04', visible: false, 'title': '訂單號' },
        {
          data: '', 'title': '製造批號<br />布疋號',
          render: function (data: any, type: any, row: any, meta: any) {
            let arr = []
            arr.push(row['RVBS04'])
            arr.push(row['TA_RVBS14'])
            return arr.join('<br />')
          }
        },
        { data: 'container', visible: false, 'title': '目前載體' },
        { data: 'IMGS03', visible: false, 'title': '庫存儲位' },
        {
          data: '', 'title': '目前載體<br />庫存儲位',
          render: function (data: any, type: any, row: any, meta: any) {
            let arr = []
            arr.push(row['container'])
            arr.push(row['IMGS03'])
            return arr.join('<br />')
          }
        },
        // { data: 'IMGS08', visible: false, 'title': '數量' },
        // { data: 'IMGS07', visible: false, 'title': '單位' },
        // {
        //   data: '', 'title': '數量', className: 'text-right',
        //   render: function (data: any, type: any, row: any, meta: any) {
        //     return ''
        //     return row['IMGS08'] + row['IMGS07']
        //   }
        // },
        { data: 'to_container', defaultContent: '', visible: false, 'title': '目的載體' },
        { data: 'to_container_IMGS03', defaultContent: '', visible: false, 'title': '目的儲位' },
        { data: 'to_container_selected', defaultContent: '', visible: false, 'title': '' },
        {
          defaultContent: '', 'title': '目的載體<br />目的儲位',
          className: 'select-td text-nowrap',
          render: function (data: any, type: any, row: any, meta: any) {
            let arr = []

            //
            let btnB = ''
            if (row['to_container_selected'] === 'Y') {
              btnB = `<span class="select-to_container">${row.to_container}</span>`
            } else {
              btnB = `<button type="button" class="btn btn-warning select-to_container">掃描目的載體</button>`
            }

            //
            arr.push(btnB)
            arr.push(row['to_container_IMGS03'])

            return arr.join('<br />')
          }
        },
      ],
      drawCallback: function (settings: any) {
        var api = this.api();
        api.rows().every(function (this: any) {
          var row = this
          var rowData = row.data()
          var rowNode = row.node()

          if (rowData._confirm === 'Y') {
            $(rowNode).addClass('scanned')
          }

          row.invalidate(); // invalidate the data DataTables has cached for this row
        });

      },
      initComplete: function (settings: any, json: any) { },
      // language: {
      //   url: '@datatable_lang_url',
      // },
      pageLength: this.pageLength
    })
  }


  scanModalShow() {
    this.scanImgsModal.show()
  }

  scanContainerModalShow() {
    this.scanContainerModal.show()
  }


  scanImgsModalConfirm(value: string) {
    if (!value || !value.trim()) {
      return
    }

    let row = DataTableHelper.getRow(this.table, ['TA_RVBS14', 'RVBS04'], value)
    let rowData = row && row.data()

    // check 
    if (rowData) {
      SweetAlert2Helper.Alert(value + ' 已掃描!')
      return
    }

    this.aimt324Service.getData(value).then(data => {
      if (!data) {
        alert('沒有資料')
      } else {
        this.table.rows.add([data]).draw()

        // keep scan
        if (!this.scan_completed) {
          setTimeout(() => {
            this.scanImgsModal.show()
          }, 400)
        }
      }

    })
  }

  private _select_row: any

  scanContainerEvent() {
    let table = this.table
    let self = this

    $(this.tableRef.nativeElement).on('click', '.select-to_container', function (this: any, e: any) {
      var $tr = $(this).closest('tr');
      var row = table.row($tr[0])
      var rowData = row.data()

      self.scanContainerModalShow()

      self._select_row = row
    })

  }

  scanContainerModalConfirm(value: string) {
    this.containerService.getLocation(value).then(data => {
      if (!data || !data.IMGS03) {
        SweetAlert2Helper.AlertWarn(`載體${value}儲位為空，請先進行載體綁定`)
      }
      else {
        let rowData = this._select_row.data()
        if (data) {
          rowData.to_container = value
          rowData.to_container_IMGS03 = data.IMGS03
          rowData.to_container_selected = 'Y'
          this.confirm_rowData(rowData)
          this._select_row.data(rowData).draw()
        }
      }
    })
  }

  private confirm_rowData(rowData: any) {
    if (rowData.to_container_selected === 'Y') {
      rowData._confirm = 'Y'
    }
  }

  cancelConfirmedRowEvent() {
    let table = this.table
    let self = this

    $(this.tableRef.nativeElement).on('click', 'tr.scanned', function (this: any, e: any) {
      var $tr = $(this).closest('tr');
      var row = table.row($tr[0])
      var rowData = row.data()

      if (rowData._confirm === 'Y') {
        SweetAlert2Helper.ConfirmWarn('確認要取消嗎?', () => {
          self.cancelConfirmedRow(row)
        })
      }
    })
  }

  cancelConfirmedRow(row: any) {
    let rowData = row.data()
    rowData._confirm = ''
    rowData.to_container_IMGS03 = ''
    rowData.to_container_selected = ''
    row.data(rowData).draw()

    let node = row.node()
    $(node).removeClass('scanned')
  }

  deleteRowEvent() {
    let table = this.table
    let self = this

    $(this.tableRef.nativeElement).on('click', 'tr:not(.scanned) td:not(.select-td)', function (this: any, e: any) {
      var $tr = $(this).closest('tr');
      var row = table.row($tr[0])
      var rowData = row.data()

      SweetAlert2Helper.ConfirmWarn('確認要刪除嗎?', () => {
        self.deleteRow(row)
      })
    })
  }

  deleteRow(row: any) {
    row.remove().draw()
  }

  submit() {
    SweetAlert2Helper.Confirm('確認要調撥嗎?', () => {
      this.aimt324Service.submit(this.table_data_confimed).then(result => {
        if (result.succ) {
          SweetAlert2Helper.AlertSucc('調撥成功', () => {
            this.clear()
          })
        } else {
          SweetAlert2Helper.AlertError(result.message)
        }
      })
    })
  }

  clear() {
    this.inputA01 = ''
    this.inputA02 = ''
    this.table.clear().draw()
  }

}
