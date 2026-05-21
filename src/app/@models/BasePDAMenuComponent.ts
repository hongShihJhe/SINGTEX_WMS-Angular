import { AfterViewChecked } from '@angular/core';
import { AuthService } from './../@services/auth-service';

export class BasePDAMenuComponent {
  menu_icon_size = '50'


  /**
   * func_code: has_permission
   */
  permission: any = {}

  constructor(private __authService: AuthService){}
    

  /**
   * query svg elements with class 'PDAMenuSVG'
   */
  set_menu_icon_size(){
    document.querySelectorAll('svg.PDAMenuSVG').forEach(el => {
      el.setAttribute('width', this.menu_icon_size)
      el.setAttribute('height', this.menu_icon_size)
    })
  }

  setPermissionByParent(){
    let funcList = Object.keys(this.permission)
    this.__authService.hasPermissionByParentList(funcList).then(results => {
      results.forEach((value, index) => {
        let func = funcList[index]
        this.permission[func] = value
      })
    })
  }

  setPermission(){
    let funcList = Object.keys(this.permission)
    this.__authService.hasPermissionList(funcList).then(results => {
      results.forEach((value, index) => {
        let func = funcList[index]
        this.permission[func] = value
      })
    })
  }

}