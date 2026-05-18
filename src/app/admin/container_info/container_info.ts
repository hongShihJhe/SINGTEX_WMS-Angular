import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, Inject } from '@angular/core';
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


  // alphabet = "abcdefghijklmnopqrstuvwxyz";
  type_list: string[] = [];

  form_container_type?: string = '_default'
  form_container_no?: string
  form_memo?: string

  @ViewChild('table') tableRef!: ElementRef
  @ViewChild('table2') table2Ref!: ElementRef

  constructor(@Inject(IAlertToken) private _IAlert: IAlert,private cdf: ChangeDetectorRef, private router: Router, private containerService: ContainerService, private containerTypeService: ContainerTypeService) {

    containerTypeService.getList().then(res => {
      if (res.data){
        this.type_list = res.data.map(item => item.container_type)
        cdf.detectChanges()
      }
    })
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.init_table()
    this.init_table2()
    this.fetchData()
    this.clickEvent()
  }

  init_table() {
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
        // {
        //   defaultContent: '', title: '', className: 'text-center actions', width: 75,
        //   "createdCell": function (td: any, cellData: any, rowData: any, rowIndex: any, colIndex: any) {
        //     let menu = self.createInlineDropDownMenu(rowData)
        //     $(td).append(menu)
        //   },
        // },
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

  init_table2() {
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
        {
          defaultContent: '', title: '', className: 'text-center actions', width: 75,
          "createdCell": function (td: any, cellData: any, rowData: any, rowIndex: any, colIndex: any) {
            let menu = self.createInlineDropDownMenu(rowData)
            $(td).append(menu)
          },
        },
        { data: 'container_type', title: '製造批號' },
        { data: 'container_type_name', title: '布疋號' },
        { data: 'container_no', title: '數量', className:'text-right' },
        { data: 'memo', title: '儲格' },
      ],
      initComplete: function (settings: any, json: any) { },
      language: {
        url: document.baseURI + 'DataTables/zh-HANT.json',
      },
      pageLength: this.pageLength
    })
  }

  /**
   * for table action
   * @returns jquery Element
   */
  createInlineDropDownMenu(rowData: any){
    let listHtml = `<div class="dropdown no-arrow">
                     <a class="dropdown-toggle dropdown_actions" href="#" role="button"
                         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         <i class="dropdown_icon fas fa-ellipsis-h fa-fw "></i>
                     </a>
                     <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                             aria-labelledby="dropdownMenuLink">
                     </div>
                 </div>`

    let $list = $(listHtml)
    
    let itemHtml
    itemHtml = `<a class="dropdown-item dropdown-item-editing" role="button">
                             <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                             修改
                         </a>`
    
    $list.find('.dropdown-menu').append($(itemHtml))

    itemHtml = `<a class="dropdown-item dropdown-item-delete" role="button">
                             <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                             刪除
                         </a>`
    
    $list.find('.dropdown-menu').append($(itemHtml))

    return $list
  }

  fetchData() {
    this.table.clear().draw()

    // this.containerService.getList().then((data: any) => {
    //   if (data.length === 0) {
    //     // alert('沒有資料')
    //   } else {
    //     this.table.rows.add(data).draw()
    //   }
    // })
  }

  add(){
    if (StringUtil.IsWhiteOrSpace(this.form_container_type) || StringUtil.IsWhiteOrSpace(this.form_container_no)){
      this._IAlert.AlertWarn('請輸入載體代號和名稱')
    }
    else{
      let data = new ContainerModel()
      data.container_type = this.form_container_type!
      data.container_no = this.form_container_no!
      data.memo = this.form_memo

      this.containerService.add(data).then(res => {
        if (res.succ){
          this._IAlert.AlertSucc('新增成功')
          this.fetchData()
          this.clearForm()
        }
        else{
          this._IAlert.AlertError(res.message)
        }
      })
    }
  }

  startEditing(rowData: any){
    this.form_container_type = rowData.container_type
    this.form_container_no = rowData.container_no
    this.form_memo = rowData.memo

  }

  update(){
    this._IAlert.ConfirmWarn('確認要修改嗎?', () => {
      let data = new ContainerModel()
      data.container_type = this.form_container_type!
      data.container_no = this.form_container_no!
      data.memo = this.form_memo

      this.containerService.update(data).then(res => {
        if (res.succ){
          this._IAlert.AlertSucc('修改成功')
          this.fetchData()
          this.clearForm()
        } else {
          this._IAlert.AlertError(res.message)
        }
      })
    })
  }

  delete(container_type: string, container_no: string){
    this._IAlert.ConfirmWarn('確認要刪除嗎?', () => {
      this.containerService.delete(container_type, container_no).then(res => {
        if (res){
          this._IAlert.AlertSucc('刪除成功')
          this.fetchData()
        } else{
          this._IAlert.AlertError('刪除失敗')
        }
      })
    })
  }

  clickEvent() {
    let self = this

    $(this.tableRef.nativeElement).on('click', '.dropdown-item-editing', function (this: any, e: any) {
      let tr = $(this).closest('tr')
      var row = self.table.row(tr)
      var rowData = row.data()

      //
      // self.router.navigateByUrl(`/admin/role/${rowData.role_code}/permission`)
      self.startEditing(rowData)
    })

    $(this.tableRef.nativeElement).on('click', '.dropdown-item-delete', function (this: any, e: any) {
      let tr = $(this).closest('tr')
      var row = self.table.row(tr)
      var rowData = row.data()

      //
      // self.router.navigateByUrl(`/admin/role/${rowData.role_code}/permission`)
      self.delete(rowData.container_type, row.container_no)
    })
  }


  clearForm(){
    this.form_container_type = '_default'
    this.form_container_no = ''
    this.form_memo = ''
  }

}
