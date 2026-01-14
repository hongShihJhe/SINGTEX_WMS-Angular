import { ContainerService } from './../../@services/container-service';
import { RoleService } from '../../@services/role-service';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-container_info',
  imports: [],
  templateUrl: './container_info.html',
  styleUrl: './container_info.scss',
})
export class ContainerInfo implements OnInit, AfterViewInit {
  table?: any
  pageLength = 50


  @ViewChild('table') tableRef!: ElementRef

  constructor(private roleService: RoleService, private router: Router, private containerService: ContainerService) {

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

            let $item = $(`<a class="dropdown-item dropdown-item-modify btn-role_permission" role="button">
                             <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                             角色權限
                         </a>`)
            $el.find('.dropdown-menu').append($item)

            $(td).append($el)
          },
        },
        { data: 'role_code', title: '角色代碼', orderable: true },
        { data: 'role_name', title: '角色名稱' }
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

    this.roleService.getList().then(data => {
      if (data.length === 0) {
        alert('沒有資料')
      } else {
        this.table.rows.add(data).draw()
      }
    })
  }

  clickEvent() {
    let self = this
    // $(this.tableRef.nativeElement).on('click', 'tr', function (this: any, e: any) {
    //   let tr = this
    //   var row = self.table.row(tr)
    //   var rowData = row.data()

    //   //
    // })

    $(this.tableRef.nativeElement).on('click', '.btn-role_permission', function (this: any, e: any) {
      let tr = $(this).closest('tr')
      var row = self.table.row(tr)
      var rowData = row.data()

      //
      self.router.navigateByUrl(`/admin/role/${rowData.role_code}/permission`)
    })
  }


}
