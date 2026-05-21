import { Injectable } from '@angular/core';
import { FuncNames } from '../@models/FuncNames';
import { SubmitResult } from '../@models/SubmitResult';
import { UserPermission } from '../@models/UserPermission';
import { PDAFunctionData } from '../@models/PDAFunctionData';

@Injectable({
  providedIn: 'root',
})


export class UserPermissionService {
  private base_href = document.baseURI
  readonly localStorage_key = 'user_permission'


  getList() {
    return new Promise<UserPermission[]>((resolve, reject) => {
      let _data: UserPermission[] = []
      let _json = localStorage.getItem(this.localStorage_key)
      if (_json) {
        _data = JSON.parse(_json)
      }
      resolve(_data)
    })
  }

  private transform(data: UserPermission) {
    let o: any = { parent_func_code: 'cimt302a', parent_func_name: PDAFunctionData.getName('cimt302a') }
    o.func_name = PDAFunctionData.getName(data.func_code)
    return Object.assign(o, data)
  }

  getListByAccount(account: string) {
    return new Promise<any[]>((resolve, reject) => {
      this.getList().then(data => {
        let role_permission = data.filter(item => item.account === account)
        if (role_permission.length) {
          resolve(role_permission.map(item => this.transform(item)))
        } else {
          resolve([])
        }
      })
    })
  }

  hasPermission(account: string, func: string) {
    return new Promise<boolean | undefined>((resolve) => {
      this.getList().then(data => {
        let data_role = data.filter(item => item.account === account)
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


  update(data: UserPermission[]) {
    return new Promise<SubmitResult>((resolve, reject) => {
      let result = new SubmitResult()

      let _data: UserPermission[] = []
      let _json = localStorage.getItem(this.localStorage_key)
      if (_json) {
        _data = JSON.parse(_json)
      }

      for (let row of data) {
        let _row = Object.assign(new UserPermission(), row)

        let findIndex = _data.findIndex((_row: UserPermission) => _row.account === row.account && _row.func_code === row.func_code)
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

  remove(account: string){
    return new Promise<SubmitResult>((resolve, reject) => {
      let result = new SubmitResult()

      let _data: UserPermission[] = []
      let _json = localStorage.getItem(this.localStorage_key)
      if (_json) {
        _data = JSON.parse(_json)
      }

      _data = _data.filter(_row => _row.account !== account)

      let json = JSON.stringify(_data)
      localStorage.setItem(this.localStorage_key, json)

      resolve(result)
    })
  }

}
