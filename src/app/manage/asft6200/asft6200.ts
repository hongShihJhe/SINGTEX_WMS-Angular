import { AfterViewInit, Component, ElementRef, Inject, OnInit, signal, ViewChild } from '@angular/core';
import { ScanModal } from '../../@shared/scan-modal/scan-modal';
import { FormsModule } from '@angular/forms';
import { DataTableUtil } from '../../@utils/DataTableHelper';
import { IAlert, IAlertToken } from '../../@interfaces/IAlert';

@Component({
  standalone: true,
  selector: 'app-asft6200',
  imports: [ScanModal, FormsModule],
  templateUrl: './asft6200.html',
  styleUrl: './asft6200.scss',
})

export class Asft6200 implements OnInit, AfterViewInit {
  table: any
  pageLength = 50
  inputA01?: string
  inputA02?: string
  inputA03?: string

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

  @ViewChild('table') tableRef!: ElementRef
  @ViewChild('A01Modal') A01Modal!: ScanModal
  @ViewChild('A02Modal') A02Modal!: ScanModal
  @ViewChild('A03Modal') A03Modal!: ScanModal
  @ViewChild('scanModal') scanModal!: ScanModal

  constructor(@Inject(IAlertToken) private _IAlert: IAlert,) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.init_table()
    this.cancelConfirmedRowEvent()
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
        { targets: '_all', orderable: false },
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
        { data: 'INB04', visible: false, 'title': '料號' },
        { data: 'RVBS06', visible: false, 'title': '數量' },
        { data: 'INB08', visible: false, 'title': '單位' },
        {
          data: '', 'title': '製造批號<br />料號',
          render: function (data: any, type: any, row: any, meta: any) {
            var arr = []
            arr.push(row['RVBS04'])
            arr.push(row['TA_RVBS14'])
            arr.push(row['INB04'])
            return arr.join('<br />')
          }
        },
        {
          data: '', 'title': '載體',
          render: function (data: any, type: any, row: any, meta: any) {

          }
        },
        {
          data: '', 'title': '數量',
          className: 'text-right',
          render: function (data: any, type: any, row: any, meta: any) {
            return row['RVBS06'] + row['INB08']
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

  A01ModalShow() {
    this.A01Modal.show()
  }

  A02ModalShow() {
    this.A02Modal.show()
  }

  A03ModalShow() {
    this.A02Modal.show()
  }

  scanModalShow() {
    this.scanModal.show()
  }

  A01ModalConfirm(value: string) {
    if (!value || !value.trim()) {
      return
    }
    this.inputA01 = value
    this.fetchData(value)
  }

  fetchData(inb01: string) {
    this.table.clear().draw()
    
  }

  A02ModalConfirm(value: string) {
    if (!value || !value.trim()) {
      return
    }
    this.inputA02 = value
  }

   A03ModalConfirm(value: string) {
    if (!value || !value.trim()) {
      return
    }
    this.inputA03 = value
  }

  scanModalConfirm(value: string) {
    if (!value || !value.trim()) {
      return
    }
    let row = DataTableUtil.getRow(this.table, ['TA_RVBS14', 'RVBS04'], value)
    let rowData = row && row.data()

    // check 
    if (!rowData) {
      this._IAlert.Alert(value + '不存在!')
      return
    } else if (rowData._confirm === 'Y') {
      this._IAlert.Alert(value + ' 已掃描!')
      return
    }

    // update 
    rowData._confirm = 'Y'
    rowData.container = this.inputA02
    row.data(rowData).draw()

    // keep scan
    if (!this.scan_completed) {
      setTimeout(() => {
        this.scanModal.show()
      }, 400)
    }
  }

  cancelConfirmedRowEvent() {
    let table = this.table
    let self = this

    $(this.tableRef.nativeElement).on('click', 'tr', function (this: any, e: any) {
      var $tr = $(this).closest('tr');
      var row = table.row($tr[0])
      var rowData = row.data()

      if (rowData._confirm === 'Y') {
        this._IAlert.Confirm('確認要取消嗎?', () => {
          self.cancelConfirmedRow(row)
        })
      }
    })
  }

  cancelConfirmedRow(row: any) {
    let rowData = row.data()
    rowData._confirm = ''
    rowData.container = ''
    row.data(rowData).draw()

    let node = row.node()
    $(node).removeClass('scanned')
  }

  submit() {
    this._IAlert.Confirm('確認要點收嗎?', () => {
      
    })
  }

  clear() {
    this.inputA01 = ''
    this.inputA02 = ''
    this.table.clear().draw()
  }

}
