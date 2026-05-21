import { ImgsFileService } from '../../@services/imgs-file-service';
import { ContainerService } from '../../@services/container-service';
import { SearchContainerService } from '../../@services/search-container-service';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, signal, ViewChild } from '@angular/core';
import { ScanModal } from "../scan-modal/scan-modal";
import { FormsModule } from '@angular/forms';
import { BasePDATableComponent } from '../../@models/BasePDATableComponent';
import { IAlert, IAlertToken } from '../../@interfaces/IAlert';

@Component({
  standalone: true,
  selector: 'app-search0',
  imports: [ScanModal, FormsModule],
  templateUrl: './search0.html',
  styleUrl: './search0.scss',
})

export class Search0 extends BasePDATableComponent implements OnInit, AfterViewInit {
  inputA01?: string
  container_ime02?: string

  @ViewChild('table') tableRef!: ElementRef
  @ViewChild('A01Modal') A01Modal!: ScanModal

  constructor(@Inject(IAlertToken) private _IAlert: IAlert, private seacrchContainerService: SearchContainerService) {
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
      order: [[0, 'asc']], // order 
      columns: [
        { data: 'RVBS04', title: '製造批號', visible: false },
        { data: 'TA_RVBS14', title: '布疋號', visible: false },
        {
          data: '', 'title': '製造批號<br />布疋號',
          render: function (data: any, type: any, row: any, meta: any) {
            var arr = []
            arr.push(row['RVBS04'])
            arr.push(row['TA_RVBS14'])
            return arr.join('<br />')
          }
        },
        { data: 'IMGS02', title: '庫存倉庫', visible: false },
        { data: 'IMGS03', title: '庫存儲位', visible: false },
        {
          data: '', 'title': '庫存倉庫<br />庫存儲位',
          render: function (data: any, type: any, row: any, meta: any) {
            var arr = []
            arr.push(row['IMGS02'])
            arr.push(row['IMGS03'])
            return arr.join('<br />')
          }
        },
        { data: 'IMGS08', title: '數量', visible: false },
        { data: 'IMGS07', title: '單位', visible: false },
        {
          data: '', 'title': '數量',
          className: 'text-right',
          render: function (data: any, type: any, row: any, meta: any) {
            if (row['IMGS08'] !== undefined) {
              return row['IMGS08'] + row['IMGS07']
            } else {
              return ''
            }
          }
        },
      ],
      drawCallback: function (settings: any) { },
      initComplete: function (settings: any, json: any) {},
    }

    this.table = $(this.tableRef.nativeElement).DataTable(this.setTableOptions(options))
  }

  override fetchTableData() {
    let container = this.inputA01
    if (container) {
      this.seacrchContainerService.fetchTableData(container).then(data => {
        if (!data.length){
          this._IAlert.Alert('沒有資料')
        } else {
          this.addTableRow(data)
        }
      })
    }
  }

  A01ModalConfirm(value: string) {
    if (!value || !value.trim()) {
      return
    }
    this.inputA01 = value

    let container = this.inputA01
    this.seacrchContainerService.getContainerIME02(container).then(ime02 => {
      this.container_ime02 = ime02
    })

    this.refreshTable()
  }


}
