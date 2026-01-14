import { RoleService } from '../../@services/role-service';
import { RolePermissionService } from '../../@services/role-permission-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Role } from '../../@models/Role';
import { RolePermission as RolePermissionModel } from '../../@models/RolePermission';

@Component({
  selector: 'app-role.permission',
  imports: [RouterLink],
  templateUrl: './role.permission.html',
  styleUrl: './role.permission.scss',
})

export class RolePermission implements OnInit, AfterViewInit {
  table?: any
  pageLength = 50

  get table_data(): any[] {
    if (this.table) {
      return this.table.rows().data().toArray()
    }
    return []
  }

  role_code?:string
  role?: Role

  @ViewChild('table') tableRef!: ElementRef

  constructor(private router: Router, private route: ActivatedRoute, private roleService: RoleService, private permissionService: RolePermissionService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      let role_code = data.get('role_code')
      this.role_code = role_code as string
      if (role_code) {
        this.roleService.get(role_code).then(data => this.role = data)
      }
    })
  }

  ngAfterViewInit(): void {
    this.init_table()
    this.fetchData()
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
    if (this.role_code) {
      this.permissionService.getListByRole(this.role_code).then(data => {
        this.table.rows.add(data).draw()
      })
    }
  }

  setRolePermission() {
    if (this.role_code){
      let data:any = []

      for (let row of this.table_data){
        let item = new RolePermissionModel()
        item.role_code = this.role_code
        item.func_code = row.func_code
        item.enabled = row.enabled

        data.push(item)
      }

      this.permissionService.update(data)
    }
  }

  enabledAll() {
      if (this.role_code) {
  
        $(this.tableRef.nativeElement).find('input[value="Y"]').prop('checked', true)
  
        let data: any = []
        for (let row of this.table_data) {
          let item = new RolePermissionModel()
          item.role_code = this.role_code
          item.func_code = row.func_code
          item.enabled = 'Y'
  
          data.push(item)
        }
  
        this.permissionService.update(data)
      }
    }
  
    disabledAll() {
      if (this.role_code) {
        $(this.tableRef.nativeElement).find('input[value="N"]').prop('checked', true)
  
        let data: any = []
        for (let row of this.table_data) {
          let item = new RolePermissionModel()
          item.role_code = this.role_code
          item.func_code = row.func_code
          item.enabled = 'N'
  
          data.push(item)
        }
  
        this.permissionService.update(data)
      }
    }
  


}
