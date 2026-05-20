import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, Inject, Renderer2, DOCUMENT } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerTypeService } from '../../@services/container-type-service';
import { Container as ContainerModel } from '../../@models/Container';
import { StringUtil } from '../../@utils/StringUtil';
import { ContainerService } from '../../@services/container-service';
import { IAlert, IAlertToken } from '../../@interfaces/IAlert';


@Component({
  standalone: true,
  selector: 'app-container_info',
  imports: [FormsModule],
  templateUrl: './container_info.html',
  styleUrl: './container_info.scss',
})

export class ContainerInfo implements OnInit, AfterViewInit {
  table?: any
  table2?: any
  pageLength = 50

  _selectedRowData:any = {}

  @ViewChild('table') tableRef!: ElementRef
  @ViewChild('table2') table2Ref!: ElementRef

  constructor(
    @Inject(IAlertToken) private _IAlert: IAlert, 
    private containerService: ContainerService) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.initTable()
    this.initTable2()
    this.clickEvent()
  }

  initTable() {
    this.setTableOption()
    this.fetchTableData()
  }

  initTable2() {
    this.setTable2Option()
  }

  setTableOption(){
    let self = this
    
    this.table = $(this.tableRef.nativeElement).DataTable({
      processing: true,
      searching: true,
      serverSide: false,
      paging: true,
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
          data: 'container_code', title: '載具編號',
          render: function (data: any, type: any, row: any, meta: any) {
            return row.container_type + row.container_no
          }
        },
        { data: 'container_type', title: '載具類型', visible: false },
        { data: 'container_no', title: '載具號碼', visible: false },
        { data: 'container_type_name', title: '載具類型' },
        { data: 'container_imgs_count', title: '筆數' },
        { data: 'memo', title: '備註' },
        { data: 'ime01', title: '倉庫' },
        { data: 'ime02', title: '儲位' },
      ],
      initComplete: function (settings: any, json: any) { },
      language: {
        url: document.baseURI + 'DataTables/zh-HANT.json',
      },
      pageLength: this.pageLength
    })
  }

  

  

  setTable2Option(){
    let self = this
    
    this.table2 = $(this.table2Ref.nativeElement).DataTable({
      processing: true,
      searching: true,
      serverSide: false,
      paging: true,
      stateSave: false,
      // ajax: {
      //   type: 'post',
      //   url: '/cimt302a0.json',
      //   data: function (d: any) {
      //     d.A01 = self.inputA01
      //   }
      // },
      columnDefs: [
        { targets: '_all', orderable: false, defaultContent: ''},
      ],
      order: [[1, 'asc']], // order 
      columns: [
        { data: 'RVBS04', title: '製造批號' },
        { data: 'TA_RVBS14', title: '布疋號' },
        { data: 'count', title: '數量', className:'text-right' },
        { data: 'ime02', title: '儲格' },
      ],
      initComplete: function (settings: any, json: any) { },
      language: {
        url: document.baseURI + 'DataTables/zh-HANT.json',
      },
      pageLength: this.pageLength
    })
  }

  


  fetchTableData() {
    this.containerService.getList().then(res => {
      if (res.succ){
        this.table.rows.add(res.data).draw()
      } else {

      }
    })
  }



  fetchTable2Data() {
    let container = this._selectedRowData.container_type + this._selectedRowData.container_no
    this.containerService.getImgsInfoList(container).then(data => {
      if (data.length){
        this.table2.rows.add(data).draw()
      } 
    })
  }

  clearTable() {
    this.table.clear().draw()
  }

  clearTable2Data() {
    this.table2.clear().draw()
  }

  refreshTableData() {
    this.clearTable()
    this.fetchTableData()
  }

  refreshTable2Data() {
    this.clearTable2Data()
    this.fetchTable2Data()
  }

  clickEvent() {
    let self = this

    $(this.tableRef.nativeElement).on('click', 'tr', function (this: any, e: any) {
      let tr = $(this).closest('tr')
      var row = self.table.row(tr)
      var rowData = row.data()

      self._selectedRowData = rowData
      self.refreshTable2Data()

      $(this).parent().find('tr').removeClass('tr-active')
      $(this).addClass('tr-active')
    })

  }



}
