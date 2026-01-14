import { ImgsFileService } from './../../@services/imgs-file-service';
import { ContainerService } from '../../@services/container-service';
import { AfterViewInit, Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { ScanModal } from "../scan-modal/scan-modal";
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-search_container',
  imports: [ScanModal, FormsModule],
  templateUrl: './search_container.html',
  styleUrl: './search_container.scss',
})

export class SearchContainer implements OnInit, AfterViewInit {
  table: any
  pageLength = 50

  inputA01?: string
  container_imgs03?: string

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

    this.containerService.getImgsList(value).then(container_imgss => {
      if (container_imgss.length === 0) {
        alert('沒有資料')
      } else {
        this.imgsFileService.getImgsFileByList(container_imgss.map(item => item.RVBS04)).then(imgs_files => {

          let map = container_imgss.map(container_imgs => {
            var result: any = {
              RVBS04: '',
              TA_RVBS14: '',
              IMGS02: '',
              IMGS03: '',
              IMGS08: '',
              IMGS07: ''
            }

            result.RVBS04 = container_imgs.RVBS04
            result.TA_RVBS14 = container_imgs.TA_RVBS14

            let imgs_file = imgs_files.find(o => o?.IMGS06 === container_imgs.RVBS04)
            if (imgs_file) {
              result.IMGS02 = imgs_file.IMGS02
              result.IMGS03 = imgs_file.IMGS03
              result.IMGS08 = imgs_file.IMGS08
              result.IMGS07 = imgs_file.IMGS07
            }

            return result
          })

          this.table.rows.add(map).draw()
        })

      }
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

    this.containerService.getLocation(value).then(loc => {
      this.container_imgs03 = loc?.IMGS03
    })

    this.fetchData(value)
  }


}
