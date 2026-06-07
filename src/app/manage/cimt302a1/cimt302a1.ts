import { ContainerService } from './../../@services/container-service';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, signal, ViewChild } from '@angular/core';
import { ScanModal } from '../../@shared/scan-modal/scan-modal';
import { FormsModule } from '@angular/forms';
import { DataTableUtil } from '../../@utils/DataTableHelper';
import { Cimt302a1Service } from '../../@services/cimt302a1-service';
import { IAlert, IAlertToken } from '../../@interfaces/IAlert';
import { Aimt3240Service } from '../../@services/aimt3240-service';
import { TransferService } from '../../@services/transfer-service';
import { BasePDATableComponent } from '../../@models/BasePDATableComponent';

@Component({
  standalone: true,
  selector: 'app-cimt302a1',
  imports: [ScanModal, FormsModule],
  templateUrl: './cimt302a1.html',
  styleUrl: './cimt302a1.scss',
})

export class Cimt302a1 extends BasePDATableComponent implements OnInit, AfterViewInit {
  inputA01?: string
  inputA02?: string

  @ViewChild('table') tableRef!: ElementRef
  @ViewChild('A01Modal') A01Modal!: ScanModal
  @ViewChild('A02Modal') A02Modal!: ScanModal
  @ViewChild('scanModal') scanModal!: ScanModal

  constructor(
    @Inject(IAlertToken) private _IAlert: IAlert, 
    private cimt302a1Service: Cimt302a1Service) {
      super()
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.init_table()
    this.cancelConfirmedRowEvent()
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
        { data: 'INB04', visible: false, 'title': '料號' },
        { data: 'RVBS06', visible: false, 'title': '數量' },
        { data: 'INB08', visible: false, 'title': '單位' },
        {
          data: '', 'title': '製造批號<br />布疋號<br />料號',
          render: function (data: any, type: any, row: any, meta: any) {
            var arr = []
            arr.push(row['TA_RVBS14'])
            arr.push(row['RVBS04'])
            arr.push(row['INB04'])
            return arr.join('<br />')
          }
        },
        { data: 'container', defaultContent: '', 'title': '載體' },
        {
          data: '', 'title': '數量',
          className: 'text-right',
          render: function (data: any, type: any, row: any, meta: any) {
            return row['RVBS06'] + row['INB08']
          }
        },
      ],
      drawCallback: function (this:any, settings: any) {
        var api = this.api();

        api.rows().every(function (this: any) {
          var row = this
          var rowData = row.data();
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


  A01ModalConfirm(value: string) {
    if (!value || !value.trim()) {
      return
    }

    this.cimt302a1Service.checkContainerExists(value).then(bool => {
      if (!bool){
        this._IAlert.AlertError(`載體 ${value} 不存在`)
      } else {
        this.inputA01 = value
        this.refreshTable()
      }
    })
  }

  override fetchTableData() {
    let container = this.inputA01
    if (container) {
      this.cimt302a1Service.getListByContainer(container).then(data => {
        if (data.length === 0) {
          this._IAlert.AlertWarn(`載體 ${container} 需點收未上架`)
        } else {
          this.addTableRow(data)
        }
      })
    }
  }

  A02ModalConfirm(value: string) {
    if (!value || !value.trim()) {
      return
    }
    this.inputA02 = value
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
    this.updateTableRow(row, rowData)

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
    this.updateTableRow(row, rowData)

    let node = row.node()
    $(node).removeClass('scanned')
  }

  submit() {
    this._IAlert.Confirm('確認要上架嗎?', () => {
      this.cimt302a1Service.submit(this.inputA01!, this.inputA02!, this.table_data).then(result => {
        if (result.succ) {
          this._IAlert.AlertSucc('上架成功', () => {
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
