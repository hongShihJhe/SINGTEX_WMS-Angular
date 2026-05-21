import { UserPermissionService } from './user-permission-service';
import { RolePermissionService } from './role-permission-service';
import { LoggedInUserData } from './../@models/LoggedInUserData';
import { Injectable } from '@angular/core';
import { isAuthResult } from '../@models/isAuthResult';
import { LoginResult } from '../@models/LoginResult';
import { UserRole } from '../@models/UserRole';
import { HttpClient } from '@angular/common/http';
import { PDAFunctionData } from '../@models/PDAFunctionData';


// interface loginCallbackFunction {
//   (data: LoginResult): void
// }

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  readonly localStorage_key = 'jwt'
  private exp_span_min = 60
  private base_href = document.baseURI

  readonly localStorage_key_permission = 'permission'

  get token() {
    return localStorage.getItem(this.localStorage_key)
  }

  get user(): LoggedInUserData | null {
    if (this.token) {
      return JSON.parse(this.token) as LoggedInUserData
    }
    return null
  }

  constructor(private http: HttpClient, private userPermissionService: UserPermissionService, private rolePermissionService: RolePermissionService) {

  }

  login(account: string, password: string) {
    return new Promise<LoginResult>((resolve, reject) => {
      this.http.get(this.base_href + 'login.json').subscribe((res: any) => {
        let result = new LoginResult()

        let logins = res.data

        let login = logins.find((item: any) => item.account === account && item.password === password)
        if (login) {
          result.succ = true

          let userData = new LoggedInUserData()
          userData.account = account
          userData.expired_date = new Date((new Date().getTime() + this.exp_span_min * 60 * 1000))

          this.http.get(this.base_href + 'userRole.json').subscribe((res: any) => {
            let userRoles = res.data.filter((role: any) => role.account === account) as UserRole[]
            if (userRoles.length) {
              userData.roles = userRoles.map(userRole => userRole.role_code)
            }

            // save jwt token
            localStorage.setItem(this.localStorage_key, JSON.stringify(userData))

            resolve(result)
          })
        } else {
          result.succ = false
          result.message = '帳號或密碼錯誤'

          resolve(result)
        }

        

      })
    })
  }

  logout() {
    localStorage.removeItem(this.localStorage_key)
  }

  isLoggedIn() {
    if (this.token) {
      return true
    } else {
      return false
    }
  }

  isExpired() {
    if (this.user) {
      if (this.user.expired_date) {
        return new Date() > this.user.expired_date
      }
    }

    return null
  }

  isAuth(): isAuthResult {
    var result = new isAuthResult()
    if (!this.isLoggedIn()) {
      result.succ = false
      result.message = '尚未登入'
      return result
    }

    if (this.isExpired()) {
      result.succ = false
      result.message = '登入已過期，請重新登入'
      return result
    }

    result.succ = true
    return result
  }

  isAdmin() {
    let roles = this.user?.roles
    if (roles && roles.length) {
      return roles.some(item => item === 'admin')
    }

    return false
  }

  hasPermissionByParent(func: string){
    return new Promise<boolean>((resolve, reject) => {
      if (this.isAdmin()){
        resolve(true)
      }

      let children: string[] = PDAFunctionData.getChildren(func).map(o => o.func_code)
      let childrenPermission = children.map(child => {
        return this.hasPermission(child)
      })

      Promise.all(childrenPermission).then(results => {
        let bool = results.some(result => result === true)
        resolve(bool)
      })
    })
  }

  hasPermissionByParentList(funcList: string[]){
    return new Promise<boolean[]>((resolve, reject) => {
      if (this.isAdmin()){
        resolve(funcList.map(o => true))
      }

      let promises = funcList.map(func => this.hasPermissionByParent(func))
      
      Promise.all(promises).then(results => {
        resolve(results)
      })
    })
  }

  hasPermission(func_code: string) {
    return new Promise<boolean>((resolve, rejcet) => {
      if (this.isAdmin()) {
        resolve(true)
      }
      else if (!this.isAuth().succ) {
        resolve(false)
      }
      else {
        let user = this.user!
        this.userPermissionService.hasPermission(user.account, func_code).then(res => {
          if (res !== undefined) {
            resolve(res)
          } else {
            this.rolePermissionService.hasPermissionByRoles(user.roles, func_code).then(res => {
              if (res !== undefined) {
                resolve(res)
              } else {
                resolve(false)
              }
            })
          }
        })
      }
    })
  }

  hasPermissionList(funcList: string[]) {
    return new Promise<boolean[]>((resolve, rejcet) => {
      if (this.isAdmin()) {
        resolve(funcList.map(o => true))
      }

      let promises = funcList.map(func => this.hasPermission(func))
      
      Promise.all(promises).then(results => {
        resolve(results)
      })
    })
  }


}
