import { Injectable } from '@angular/core';
import { RolePermission } from '../@models/RolePermission';
import { FuncNames } from '../@models/FuncNames';
import { SubmitResult } from '../@models/SubmitResult';

@Injectable({
  providedIn: 'root',
})


export class RolePermissionService {
  private base_href = document.baseURI
  readonly localStorage_key = 'role_permission'


  getList() {
    return new Promise<RolePermission[]>((resolve, reject) => {
      let _data: RolePermission[] = []
      let _json = localStorage.getItem(this.localStorage_key)
      if (_json) {
        _data = JSON.parse(_json)
      }
      resolve(_data)
    })
  }

  createPermssionItem(parent: string, func: string){
    return {
      parent_func_code: parent,
      parent_func_name: FuncNames.get(parent),
      func_code: func,
      func_name: FuncNames.get(func),
      enabled: 'N'
    }
  }

  getListByRole(role_code: string) {
    return new Promise((resolve, reject) => {
      let default_data = [
        this.createPermssionItem('cimt302a', 'cimt302a0'),
        this.createPermssionItem('cimt302a', 'cimt302a1'),
        this.createPermssionItem('cimt302a', 'cimt302a2'),
        this.createPermssionItem('aimt324', 'aimt3240'),
        this.createPermssionItem('aimt324', 'aimt3241'),
        this.createPermssionItem('aimt324', 'aimt3242'),
        this.createPermssionItem('aimt324', 'aimt3243'),
        this.createPermssionItem('search', 'search_container'),
        this.createPermssionItem('search', 'search_imgs'),
      ]

      this.getList().then(data => {
        let role_permission = data.filter(item => item.role_code === role_code)
        if (role_permission.length) {
          resolve(role_permission.map(item => this.transform(item)))
        } else {
          resolve(default_data)
        }
      })
    })
  }

  hasPermission(role: string, func: string) {
    return new Promise<boolean | undefined>((resolve) => {
      this.getList().then(data => {
        let data_role = data.filter(item => item.role_code === role)
        if (!data_role.length) {
          resolve(undefined)
        } else {
          let data_role_Y = data_role.filter(item => item.enabled === 'Y')
          let includes = data_role_Y.map(item => item.func_code).includes(func)
          resolve(includes)
        }
      })
    })
  }

  hasPermissionByRoles(roles: string[], func: string) {
    return new Promise<boolean | undefined>((resolve) => {
      this.getList().then(data => {
        let data_role = data.filter(item => roles.includes(item.role_code))
        if (!data_role.length) {
          resolve(undefined)
        } else {
          let data_role_Y = data_role.filter(item => item.enabled === 'Y')
          let includes = data_role_Y.map(item => item.func_code).includes(func)
          resolve(includes)
        }
      })
    })
  }

  update(data: RolePermission[]) {
    return new Promise<SubmitResult>((resolve, reject) => {
      let result = new SubmitResult()

      let _data: RolePermission[] = []
      let _json = localStorage.getItem(this.localStorage_key)
      if (_json) {
        _data = JSON.parse(_json)
      }

      for (let row of data) {
        let _row = Object.assign(new RolePermission(), row)

        let findIndex = _data.findIndex((_row: RolePermission) => _row.role_code === row.role_code && _row.func_code === row.func_code)
        if (findIndex != -1) {
          _data[findIndex] = _row
        } else {
          _data.push(_row)
        }
      }

      let json = JSON.stringify(_data)
      localStorage.setItem(this.localStorage_key, json)

      resolve(result)
    })
  }

  private transform(data: RolePermission) {
    let o: any = { parent_func_code: 'cimt302a', parent_func_name: FuncNames.get('cimt302a') }
    o.func_name = FuncNames.get(data.func_code)
    return Object.assign(o, data)
  }

}
