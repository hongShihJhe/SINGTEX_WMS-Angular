import { ImgsFileService } from './../../@services/imgs-file-service';
import { ContainerService } from '../../@services/container-service';
import { AfterViewInit, Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { ScanModal } from "../scan-modal/scan-modal";
import { FormsModule } from '@angular/forms';
import { ContainerImgs } from '../../@models/ContainerImgs';

@Component({
  standalone: true,
  selector: 'app-search_imgs',
  imports: [ScanModal, FormsModule],
  templateUrl: './search_imgs.html',
  styleUrl: './search_imgs.scss',
})

export class SearchImgs implements OnInit, AfterViewInit {
  table: any
  pageLength = 50

  inputA01?: string

  @ViewChild('table') tableRef!: ElementRef
  @ViewChild('A01Modal') A01Modal!: ScanModal

  get rows_count() {
    if (this.table) {
      return this.table.rows().count()
    }
    return 0
  }

  get table_data(): any[] {
    if (this.table) {
      return this.table.rows().data().toArray()
    }
    return []
  }


  constructor(private containerService: ContainerService, private imgsFileService: ImgsFileService) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.init_table()
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
      drawCallback: function (settings: any) {

      },
      initComplete: function (settings: any, json: any) {

      },
      // language: {
      //   url: '@datatable_lang_url',
      // },
      pageLength: this.pageLength
    })
  }



  fetchData(value: string) {
    this.table.clear().draw()

    this.containerService.getImgsByRVBS04OrTA_RVBS14(value).then(container_imgs => {
      if (!container_imgs) {
        alert('沒有資料')
      } else {
        let p1 = this.imgsFileService.getImgsFile(container_imgs.RVBS04)
        let p2 = this.containerService.getLocation(container_imgs.container)
        Promise.all([p1, p2]).then(values => {
          let imgs_file = values[0]
          let loc = values[1]

          var row: any = {}
          row.container = container_imgs.container
          row.container_IMGS03 = loc?.IMGS03
          row.IMGS02 = imgs_file?.IMGS02
          row.IMGS03 = imgs_file?.IMGS03
          row.IMGS08 = imgs_file?.IMGS08
          row.IMGS07 = imgs_file?.IMGS07

          this.table.rows.add([row]).draw()
        })
      }
    })

  }

  toDto(data: ContainerImgs) {
    return new Promise((resolve, reject) => {
      resolve('')
    })
  }

  A01ModalShow() {
    this.A01Modal.show()
  }

  A01ModalConfirm(value: string) {
    if (!value || !value.trim()) {
      return
    }
    this.inputA01 = value

    this.fetchData(value)
  }


}
