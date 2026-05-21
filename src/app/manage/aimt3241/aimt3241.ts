import { Aimt3241Service } from './../../@services/aimt3241-service';
import { ContainerService } from '../../@services/container-service';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, signal, ViewChild } from '@angular/core';
import { ScanModal } from "../scan-modal/scan-modal";
import { FormsModule } from '@angular/forms';
import { IAlert, IAlertToken } from '../../@interfaces/IAlert';
import { BasePDATableComponent } from '../../@models/BasePDATableComponent';

@Component({
  standalone: true,
  selector: 'app-aimt3241',
  imports: [ScanModal, FormsModule],
  templateUrl: './aimt3241.html',
  styleUrl: './aimt3241.scss',
})

export class Aimt3241 extends BasePDATableComponent implements OnInit, AfterViewInit {
  inputA01?: string
  inputA02?: string

  @ViewChild('table') tableRef!: ElementRef
  @ViewChild('A01Modal') A01Modal!: ScanModal
  @ViewChild('A02Modal') A02Modal!: ScanModal

  constructor(@Inject(IAlertToken) private _IAlert: IAlert, private aimt3241Service: Aimt3241Service) {
    super()
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.init_table()
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
      columnDefs: [
        { targets: '_all', orderable: false, defaultContent: '' },
      ],
      order: [], // order 
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
        { data: 'RVBS06', visible: false, 'title': '數量' },
        { data: 'INB08', visible: false, 'title': '單位' },
        {
          data: '', 'title': '製造批號<br />布疋號',
          render: function (data: any, type: any, row: any, meta: any) {
            var arr = []
            arr.push(row['TA_RVBS14'])
            arr.push(row['RVBS04'])
            return arr.join('<br />')
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

  A01ModalShow() {
    this.A01Modal.show()
  }

  A02ModalShow() {
    this.A02Modal.show()
  }


  A01ModalConfirm(value: string) {
    if (!value || !value.trim()) {
      return
    }

    let container = value
    this.aimt3241Service.checkConainerExists(container).then(bool => {
      if (!bool){
        this._IAlert.AlertError(`載體 ${value} 不存在`)
      } else {
        this.inputA01 = value
        this.fetchTableData()
      }
    })
    
  }

  override fetchTableData() {
    let container = this.inputA01
    if (container){
      this.aimt3241Service.fetchTableData(container).then(data => {
        if (!data.length ) {
          this._IAlert.Alert(`沒有資料`)
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

  submit() {
    this._IAlert.Confirm('確認要載體更換嗎?', () => {
      if (!this.inputA01 || !this.inputA02) {
        this._IAlert.Alert('請輸入載體和儲位')
        return
      }

      let from_cotainer = this.inputA01
      let to_container = this.inputA02

      this.aimt3241Service.submit(from_cotainer, to_container).then(result => {
        if (result.succ) {
          this._IAlert.AlertSucc('載體更換成功', () => {
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
