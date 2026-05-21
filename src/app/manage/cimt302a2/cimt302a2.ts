import { AfterViewInit, Component, ElementRef, Inject, OnInit, signal, ViewChild } from '@angular/core';
import { Cimt302a2Service } from '../../@services/cimt302a2-service';
import { DateUtil } from '../../@utils/DateUtil';
import { IAlert, IAlertToken } from '../../@interfaces/IAlert';
import { BasePDATableComponent } from '../../@models/BasePDATableComponent';

@Component({
  selector: 'app-cimt302a2',
  imports: [],
  templateUrl: './cimt302a2.html',
  styleUrl: './cimt302a2.scss',
})
export class Cimt302a2 extends BasePDATableComponent implements OnInit, AfterViewInit {

  @ViewChild('table') tableRef!: ElementRef

  constructor(@Inject(IAlertToken) private _IAlert: IAlert, private cimt302a2Service: Cimt302a2Service) {
    super()
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.init_table()
    this.fetchTableData()
  }

  init_table() {
    let self = this
    let options = {
      processing: true,
      searching: true,
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
        { data: 'INB01', 'title': '單號' },
        { data: 'RVBS04', visible: false, 'title': '製造批號' },
        { data: 'TA_RVBS14', visible: false, 'title': '布疋號' },
        { data: 'INB04', visible: false, 'title': '料號' },
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
        { data: 'out_ts', visible: false, 'title': '點收時間' },
        { data: 'out_user', visible: false, 'title': '點收人' },
        {
          data: '', 'title': '點收時間<br />點收人',
          render: function (data: any, type: any, row: any, meta: any) {
            var arr = []
            arr.push(DateUtil.format(new Date(row['out_ts'])))
            arr.push(row['out_user'])
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

  fetchTableData() {
    this.cimt302a2Service.getList().then(data => {
      if (data.length === 0) {
        this._IAlert.Alert(`沒有資料`)
      } else {
        this.addTableRow(data)
      }
    })
  }
}
