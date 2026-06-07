import { SearchImgsService } from '../../@services/search-imgs-service';
import { ImgsFileService } from '../../@services/imgs-file-service';
import { ContainerService } from '../../@services/container-service';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, signal, ViewChild } from '@angular/core';
import { ScanModal } from '../../@shared/scan-modal/scan-modal';
import { FormsModule } from '@angular/forms';
import { ContainerImgs } from '../../@models/ContainerImgs';
import { BasePDATableComponent } from '../../@models/BasePDATableComponent';
import { IAlert, IAlertToken } from '../../@interfaces/IAlert';

@Component({
  standalone: true,
  selector: 'app-search1',
  imports: [ScanModal, FormsModule],
  templateUrl: './search1.html',
  styleUrl: './search1.scss',
})

export class Search1 extends BasePDATableComponent implements OnInit, AfterViewInit {
  inputA01?: string
  @ViewChild('table') tableRef!: ElementRef
  @ViewChild('A01Modal') A01Modal!: ScanModal

  constructor(@Inject(IAlertToken) private _IAlert: IAlert, private searchImgsService: SearchImgsService) {
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
        { data: 'container', visible: false, title: '載體' },
        { data: 'container_IMGS03', title: '儲位', visible: false },
        {
          data: '', 'title': '載體<br />載體儲位',
          render: function (data: any, type: any, row: any, meta: any) {
            var arr = []
            arr.push(row['container'])
            arr.push(row['container_IMGS03'])
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
      drawCallback: function (settings: any) {},
      initComplete: function (settings: any, json: any) {},
    }

    this.table = $(this.tableRef.nativeElement).DataTable(this.setTableOptions(options))
  }

  override fetchTableData() {
    let imgs_value = this.inputA01
    if (imgs_value){
      this.searchImgsService.fetchTableData(imgs_value).then(data => {
        if (!data){
          this._IAlert.Alert('沒有資料')
        } else {
          this.addTableRow([data])
        }
      })
    }
  }

  A01ModalConfirm(value: string) {
    if (!value || !value.trim()) {
      return
    }
    this.inputA01 = value
    this.refreshTable()
  }

}
