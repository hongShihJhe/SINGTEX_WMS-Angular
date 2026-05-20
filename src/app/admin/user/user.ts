import { UserService } from './../../@services/user-service';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRole } from '../../@models/UserRole';
import { PlatformLocation } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-user',
  imports: [FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User implements OnInit, AfterViewInit {

  base_href = '/'

  table?: any
  pageLength = 50
  selectRole = '_all'
  selectRoleOptions: any[] = [{ value: '_all', text: 'all' }]

  _all_table_data?: any
  
  get table_data(): any[] {
    if (this.table) {
      return this.table.rows().data().toArray()
    }
    return []
  }

  @ViewChild('table') tableRef!: ElementRef

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.init_table()
    this.fetchData()
    this.clickEvent()
  }

  init_table() {
    let self = this
    this.table = $(this.tableRef.nativeElement).DataTable({
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
        { targets: '_all', orderable: false },
      ],
      order: [[1, 'asc']], // order 
      columns: [
        {
          defaultContent: '', title: 'actions', className: ' text-center', width: 75,
          "createdCell": function (td: any, cellData: any, rowData: any, rowIndex: any, colIndex: any) {
            let html = `
                     <div class="dropdown no-arrow">
                     <a class="dropdown-toggle dropdown_actions" href="#" role="button"
                         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         <i class="dropdown_icon fas fa-ellipsis-h fa-fw "></i>
                     </a>
                     <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                             aria-labelledby="dropdownMenuLink">

                         
                     </div>
                 </div>
                 `
            let $el = $(html)
            let $item = $(`<a class="dropdown-item dropdown-item-modify btn-user_permission" role="button">
                             <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                             使用者權限
                         </a>`)
            let $item2 = $(`<a class="dropdown-item dropdown-item-modify btn-role_permission" role="button">
                             <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                             角色權限
                         </a>`)

            $el.find('.dropdown-menu').append($item)
            $el.find('.dropdown-menu').append($item2)

            if (rowData.role_code !== 'admin') {
              $(td).append($el)
            }

          },
        },
        { data: 'account', title: '帳號', orderable: true },
        { data: 'password', title: '密碼', orderable: true },
        { data: 'role_code', title: '角色', orderable: true },
      ],
      initComplete: function (settings: any, json: any) { },
      // language: {
      //   url: '@datatable_lang_url',
      // },
      pageLength: this.pageLength
    })
  }

  fetchData() {
    this.table.clear().draw()

    this.userService.getList().then(data => {
      if (data.length === 0) {
        alert('沒有資料')
      } else {
        this._all_table_data = data

        this.setSelectRoleOptions(data)
        
        this.table.rows.add(data).draw()
      }
    })
  }

  setSelectRoleOptions(data: UserRole[]) {
    let options = data.map(function (item) {
      return { value: item.role_code, text: item.role_code }
    })

    let _tmp: any = {}
    let options_set = []
    for (let item of options) {
      if (!_tmp[item.value]) {
        _tmp[item.value] = true
        options_set.push(item)
      }
    }

    options_set.sort(function (a: any, b: any) {
      return a.value - b.value
    })

    this.selectRoleOptions = this.selectRoleOptions.concat(options_set)
  }

  filterByRole() {
    this.table.clear().draw()
    if (this.selectRole === '_all') {
      this.table.rows.add(this._all_table_data).draw()
    } else {
      let data = this._all_table_data.filter((row: any) => row.role_code === this.selectRole)
      this.table.rows.add(data).draw()
    }
  }

  clickEvent() {
    let self = this
    // $(this.tableRef.nativeElement).on('click', 'tr', function (this: any, e: any) {
    //   let tr = this
    //   var row = self.table.row(tr)
    //   var rowData = row.data()

    //   //
    // })

    $(this.tableRef.nativeElement).on('click', '.btn-user_permission', function (this: any, e: any) {
      let tr = $(this).closest('tr')
      var row = self.table.row(tr)
      var rowData = row.data()

      //
      self.router.navigateByUrl(`/admin/user/${rowData.account}/permission`)
    })

    $(this.tableRef.nativeElement).on('click', '.btn-role_permission', function (this: any, e: any) {
      let tr = $(this).closest('tr')
      var row = self.table.row(tr)
      var rowData = row.data()

      //
      self.router.navigateByUrl(`/admin/role/${rowData.role_code}/permission`)
    })
  }

}
