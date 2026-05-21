import { Injectable } from '@angular/core';
import { RolePermission } from '../@models/RolePermission';
import { FuncNames } from '../@models/FuncNames';
import { SubmitResult } from '../@models/SubmitResult';
import { PDAFunctionData } from '../@models/PDAFunctionData';

@Injectable({
  providedIn: 'root',
})


export class RolePermissionService {
  private base_href = document.baseURI
  readonly localStorage_key = 'role_permission'

  getData() {
    return new Promise<RolePermission[]>((resolve, reject) => {
      let _data: RolePermission[] = []
      let _json = localStorage.getItem(this.localStorage_key)
      if (_json) {
        _data = JSON.parse(_json)
      }
      resolve(_data)
    })
  }

  createDefaultViewData(){
    let data = PDAFunctionData.data
    let filter = data.filter(o => o.parent)
    let map = filter.map(item => {
      let result: any = {}

      result.parent_func_code = item.parent
      result.parent_func_name = PDAFunctionData.getName(item.parent)
      result.func_code = item.func_code
      result.func_name = item.func_name
      result.enabled = 'N'

      return result
    })

    return map
  }

  getListByRole(role_code: string) {
    return new Promise((resolve, reject) => {
      let defaultViewdata = this.createDefaultViewData()

      this.getData().then(rolePermissions => {
        let filter = rolePermissions.filter(item => item.role_code === role_code)
        if (filter.length) {
          resolve(this.toViewData(filter))
        } else {
          resolve(defaultViewdata)
        }
      })
    })
  }

  hasPermission(role: string, func: string) {
    return new Promise<boolean | undefined>((resolve) => {
      this.getData().then(data => {
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
      this.getData().then(data => {
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

  private toViewData(rolePermissions: RolePermission[]) {
    let viewData = this.createDefaultViewData()


    rolePermissions.forEach((rolePermission, idx) => {
      let viewRow = viewData.find(o => o.func_code === rolePermission.func_code)
      if (viewRow){
        viewRow.enabled = rolePermission.enabled
      }
    })


    return viewData
  }

}
