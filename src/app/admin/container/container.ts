import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerTypeService } from '../../@services/container-type-service';
import { Container as ContainerModel } from '../../@models/Container';
import { StringUtil } from '../../@utils/StringUtil';
import { ContainerService } from '../../@services/container-service';
import { IAlert, IAlertToken } from '../../@interfaces/IAlert';
import { FormOpSuccState } from '../../@models/FormOpSuccState';
import { FormOpFailState } from '../../@models/FormOpFailState';
import { SubmitResult, SubmitResultWithData } from '../../@models/SubmitResult';
import { BaseViewComponent } from '../../@models/BaseViewComponent';
import { ContainerValidatorCodes } from '../../@validators/ContainerValidatorCodes';
import { ContainerTypeValidatorCodes } from '../../@validators/ContainerTypeValidatorCodes';


@Component({
  standalone: true,
  selector: 'app-container',
  imports: [FormsModule],
  templateUrl: './container.html',
  styleUrl: './container.scss',
})

export class Container extends BaseViewComponent implements OnInit, AfterViewInit {
  table?: any
  pageLength = 50

  type_list: string[] = [];
  form_container_type?: string = ''
  form_container_no?: string
  form_memo?: string

  @ViewChild('table') tableRef!: ElementRef

  constructor(@Inject(IAlertToken) private _IAlert: IAlert, private cdf: ChangeDetectorRef, private router: Router, private containerService: ContainerService, private containerTypeService: ContainerTypeService) {
    super()
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.init_table()
    this.setFormStateOp()
    this.clickEvent()
    this.setTypeList()
  }

  setFormStateOp() {
    // succState
    this.succState.getListCallback = (result: SubmitResultWithData<any>) => {
      if (result.data) {
        this.addTableRow(result.data)
      }
    }

    this.succState.addCallback = (result: SubmitResult) => {
      this._IAlert.AlertSucc('新增成功')
      this.refreshTableData()
      this.clearForm()
    }

    this.succState.updateCallback = (result: SubmitResult) => {
      this._IAlert.AlertSucc('修改成功')
      this.refreshTableData()
      this.clearForm()
    }

    this.succState.deleteCallback = (result: SubmitResult) => {
      this._IAlert.AlertSucc('刪除成功')
      this.refreshTableData()
    }

    // failState
    this.failState.getListCallback = () => {
      this._IAlert.AlertError('讀取失敗')
    }

    this.failState.addCallback = (result: SubmitResult) => {
      switch (result.code) {
        case ContainerValidatorCodes.D001:
          this._IAlert.AlertError('資料已存在')
          break;
        case ContainerValidatorCodes.M000:
          this._IAlert.AlertError('請選擇載具類型並輸入載具號碼')
          break;
        case ContainerValidatorCodes.M001:
          this._IAlert.AlertError('載具類型長度超過1')
          break;
        case ContainerValidatorCodes.M002:
          this._IAlert.AlertError('載具號碼請輸入3位數字')
          break;
        case ContainerValidatorCodes.M003:
          this._IAlert.AlertError('載具號碼請輸入數字')
          break;
        case ContainerValidatorCodes.M004:
          this._IAlert.AlertError('備註長度超過50')
          break;
        default:
          this._IAlert.AlertError(result.message)
          break;
      }
    }

    this.failState.updateCallback = (result: SubmitResult) => {
      switch (result.code) {
        case ContainerValidatorCodes.D000:
          this._IAlert.AlertError('資料不存在')
          break;
        case ContainerValidatorCodes.M000:
          this._IAlert.AlertError('請選擇載具類型並輸入載具號碼')
          break;
        case ContainerValidatorCodes.M001:
          this._IAlert.AlertError('載具類型長度超過1')
          break;
        case ContainerValidatorCodes.M002:
          this._IAlert.AlertError('載具號碼請輸入3位數字')
          break;
        case ContainerValidatorCodes.M003:
          this._IAlert.AlertError('載具號碼請輸入數字')
          break;
        case ContainerValidatorCodes.M004:
          this._IAlert.AlertError('備註長度超過50')
          break;
        default:
          this._IAlert.AlertError(result.message)
          break;
      }
    }

    this.failState.deleteCallback = (result: SubmitResult) => {
      this._IAlert.AlertSucc('刪除失敗')
    }
  }

  setTypeList(){
    this.containerTypeService.getList().then(res => {
      if (res.data) {
        this.type_list = res.data?.map(item => item.container_type)
        this.cdf.detectChanges()
      }
    })
  }

  init_table() {
    this.setTableOption()
    this.fetchTableData()
  }

  setTableOption() {
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
        { targets: '_all', orderable: false },
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
        { data: 'container_type', title: '載具類型' },
        { data: 'container_type_name', title: '類型名稱', defaultContent: '' },
        { data: 'container_no', title: '載具號碼' },
        { data: 'memo', title: '備註' },
      ],
      initComplete: function (settings: any, json: any) { },
      language: {
        url: document.baseURI + 'DataTables/zh-HANT.json',
      },
      pageLength: this.pageLength
    })
  }


  createInlineDropDownMenu(rowData: any) {
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

  fetchTableData() {
    this.containerService.getList().then(res => {
      if (res.succ) {
        this.succState.getListCallback(res)
      } else {
        this.failState.getListCallback(res)
      }
    })
  }

  addTableRow(rowData: any) {
    this.table.rows.add(rowData).draw()
  }

  clearTableData() {
    this.table.clear().draw()
  }

  refreshTableData() {
    this.clearTableData()
    this.fetchTableData()
  }

  add() {
    let data = new ContainerModel()
    data.container_type = this.form_container_type!
    data.container_no = this.form_container_no!
    data.memo = this.form_memo

    this.handleAddPromise(this.containerService.add(data))
  }

  update() {
    this._IAlert.ConfirmWarn('確認要修改嗎?', () => {
      let data = new ContainerModel()
      data.container_type = this.form_container_type!
      data.container_no = this.form_container_no!
      data.memo = this.form_memo

      this.handleUpdatePromise(this.containerService.update(data))
    })
  }

  delete(container_type: string, container_no: string) {
    this._IAlert.ConfirmWarn('確認要刪除嗎?', () => {
      this.handleDeletePromise(this.containerService.delete(container_type, container_no))
    })
  }

  clickEvent() {
    let self = this

    // edit
    $(this.tableRef.nativeElement).on('click', '.dropdown-item-editing', function (this: any, e: any) {
      let tr = $(this).closest('tr')
      var row = self.table.row(tr)
      var rowData = row.data()

      self.startEditing(rowData)
    })

    // delete
    $(this.tableRef.nativeElement).on('click', '.dropdown-item-delete', function (this: any, e: any) {
      let tr = $(this).closest('tr')
      var row = self.table.row(tr)
      var rowData = row.data()

      self.delete(rowData.container_type, row.container_no)
    })
  }

  startEditing(rowData: any) {
    this.form_container_type = rowData.container_type
    this.form_container_no = rowData.container_no
    this.form_memo = rowData.memo
  }


  clearForm() {
    this.form_container_type = ''
    this.form_container_no = ''
    this.form_memo = ''
  }
}

