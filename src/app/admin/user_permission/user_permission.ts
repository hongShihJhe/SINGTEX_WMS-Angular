import { UserService } from '../../@services/user-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserPermission as UserPermissionModel } from '../../@models/UserPermission';
import { UserPermissionService } from '../../@services/user-permission-service';
import { RolePermissionService } from '../../@services/role-permission-service';

@Component({
  selector: 'app-user.permission',
  imports: [RouterLink],
  templateUrl: './user_permission.html',
  styleUrl: './user_permission.scss',
})
export class UserPermission implements OnInit, AfterViewInit {
  table?: any
  pageLength = 50

  get table_data(): any[] {
    if (this.table) {
      return this.table.rows().data().toArray()
    }
    return []
  }

  account?: string
  role_code?: string

  @ViewChild('table') tableRef!: ElementRef

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userPermissionService: UserPermissionService,
    private rolePermissionService: RolePermissionService,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      let account = data.get('account')
      this.account = account as string
      if (account) {
        this.userService.get(account).then(data => {
          if (data) {
            this.role_code = data.role_code
          }
          this.fetchData()
        })
      }
    })
  }

  ngAfterViewInit(): void {
    this.init_table()
    // this.fetchData()
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
        { targets: '_all', orderable: false },
      ],
      order: [], 
      columns: [
        { data: 'parent_func_code', 'title': '', visible: false },
        { data: 'parent_func_name', 'title': '主功能', },
        { data: 'func_code', 'title': '', visible: false },
        { data: 'func_name', 'title': '子功能' },
        {
          data: 'enabled', title: '權限開關', defaultContent: '',
          createdCell: function (td: any, cellData: any, rowData: any) {
            $(td).empty()

            let html = `<div class="form-check form-check-inline" >
                                                                    <input role="button" class="form-check-input" type="radio" name="${rowData.func_code}_control" id="${rowData.func_code}-Y" value="Y" >
                                    <label role="button" class="form-check-label" for="${rowData.func_code}-Y">開放</label>
            </div>
            <div class="form-check form-check-inline">
                                                                    <input role="button" class="form-check-input" type="radio" name="${rowData.func_code}_control" id="${rowData.func_code}-N" value="N" checked>
                                    <label role="button" class="form-check-label" for="${rowData.func_code}-N" >關閉</label>
            </div>`


            let $el = $(html)

            // default
            if (cellData) {
              $el.find(`input[value=${cellData}]`).prop('checked', true)
            }

            // click 
            $el.find('input').change(function (this: any) {
              rowData.enabled = this.value
              self.setRolePermission()
            })

            $(td).append($el)
          }
        },
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
    if (this.account) {
      this.userPermissionService.getListByAccount(this.account).then(data => {
        if (data.length) {
          this.table.rows.add(data).draw()
        } else {
          this.rolePermissionService.getListByRole(this.role_code as string).then(data => {
            this.table.rows.add(data).draw()
          })
        }
      })
    }
  }

  setRolePermission() {
    if (this.account) {
      let data: any = []

      for (let row of this.table_data) {
        let item = new UserPermissionModel()
        item.account = this.account
        item.func_code = row.func_code
        item.enabled = row.enabled

        data.push(item)
      }

      this.userPermissionService.update(data)
    }
  }

  enabledAll() {
    if (this.account) {

      $(this.tableRef.nativeElement).find('input[value="Y"]').prop('checked', true)

      let data: any = []
      for (let row of this.table_data) {
        let item = new UserPermissionModel()
        item.account = this.account
        item.func_code = row.func_code
        item.enabled = 'Y'


        data.push(item)
      }

      this.userPermissionService.update(data)
    }
  }

  disabledAll() {
    if (this.account) {
      $(this.tableRef.nativeElement).find('input[value="N"]').prop('checked', true)

      let data: any = []
      for (let row of this.table_data) {
        let item = new UserPermissionModel()
        item.account = this.account
        item.func_code = row.func_code
        item.enabled = 'N'

        data.push(item)
      }

      this.userPermissionService.update(data)
    }
  }

  reset() {
    if (this.account) {
      this.userPermissionService.remove(this.account).then(res => {
        this.fetchData()
      })
    }
  }

}
