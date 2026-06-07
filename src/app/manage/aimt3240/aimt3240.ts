import { ContainerService } from '../../@services/container-service';
import { Aimt3240Service } from '../../@services/aimt3240-service';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTableUtil } from '../../@utils/DataTableHelper';
import { IAlert, IAlertToken } from '../../@interfaces/IAlert';
import { BasePDATableComponent } from '../../@models/BasePDATableComponent';
import { ScanModal } from '../../@shared/scan-modal/scan-modal';

@Component({
  standalone: true,
  selector: 'app-aimt3240',
  imports: [ScanModal, FormsModule],
  templateUrl: './aimt3240.html',
  styleUrl: './aimt3240.scss',
})

export class Aimt3240 extends BasePDATableComponent implements OnInit, AfterViewInit {
  override fetchTableData(): void {
    throw new Error('Method not implemented.');
  }

  inputA01?: string
  inputA02?: string

  _select_row: any

  @ViewChild('table') tableRef!: ElementRef
  @ViewChild('scanImgsModal') scanImgsModal!: ScanModal
  @ViewChild('scanContainerModal') scanContainerModal!: ScanModal

  constructor(@Inject(IAlertToken) private _IAlert: IAlert,private aimt3240Service: Aimt3240Service) {
    super()
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.init_table()
    this.scanContainerEvent()
    this.cancelRowEvent()
  }

  init_table() {
    let self = this
    let options = {
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
      drawCallback: function (this:any, settings: any) {
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
    }

    this.table = $(this.tableRef.nativeElement).DataTable(this.setTableOptions(options))
  }

  scanImgsModalConfirm(value: string) {
    if (!value || !value.trim()) {
      return
    }

    let row = DataTableUtil.getRow(this.table, ['TA_RVBS14', 'RVBS04'], value)
    let rowData = row && row.data()

    // check 
    if (rowData) {
      this._IAlert.Alert(value + ' 已掃描!')
      return
    }

    this.aimt3240Service.getData(value).then(data => {
      if (!data) {
        this._IAlert.AlertWarn('沒有資料')
      } else {
        this.addTableRow([data])

        // keep scan
        if (!this.scan_completed) {
          setTimeout(() => {
            this.scanImgsModal.show()
          }, 400)
        }
      }
    })
  }

  scanContainerEvent() {
    let table = this.table
    let self = this

    $(this.tableRef.nativeElement).on('click', '.select-to_container', function (this: any, e: any) {
      var $tr = $(this).closest('tr');
      var row = table.row($tr[0])
      var rowData = row.data()

      self._select_row = row
      self.scanContainerModal.show()
    })
  }

  scanContainerModalConfirm(value: string) {
    this.aimt3240Service.getContainerIME02(value).then(ime02 => {
      if (!ime02) {
        this._IAlert.AlertWarn(`載體${value}儲位為空，請先進行載體綁定`)
      }
      else {
        let row = this._select_row
        if (row) {
          let rowData = row.data()
          rowData.to_container = value
          rowData.to_container_IMGS03 = ime02
          rowData.to_container_selected = 'Y'
          rowData._confirm = 'Y'
          this._select_row.data(rowData).draw()
        }
      }
    })
  }


  cancelRowEvent() {
    let table = this.table
    let self = this

    // cancel
    $(this.tableRef.nativeElement).on('click', 'tr.scanned', function (this: any, e: any) {
      var $tr = $(this).closest('tr');
      var row = table.row($tr[0])
      var rowData = row.data()

      if (rowData._confirm === 'Y') {
        self._IAlert.ConfirmWarn('確認要取消嗎?', () => {
          self.cancelConfirmedRow(row)
        })
      }
    })

    // delete
    $(this.tableRef.nativeElement).on('click', 'tr:not(.scanned) td:not(.select-td)', function (this: any, e: any) {
      var $tr = $(this).closest('tr');
      var row = table.row($tr[0])
      var rowData = row.data()

      self._IAlert.ConfirmWarn('確認要刪除嗎?', () => {
        self.deleteTableRow(row)
      })
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


  submit() {
    this._IAlert.Confirm('確認要調撥嗎?', () => {
      this.aimt3240Service.submit(this.table_data_confimed).then(result => {
        if (result.succ) {
          this._IAlert.AlertSucc('調撥成功', () => {
            this.clearForm()
            this.clearTable()
          })
        } else {
          this._IAlert.AlertError(result.message)
        }
      })
    })
  }

  clearForm() {
    this.inputA01 = ''
    this.inputA02 = ''
  }

}
