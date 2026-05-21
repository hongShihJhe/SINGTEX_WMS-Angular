import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../@services/auth-service';
import { IAlertToken } from '../@interfaces/IAlert';
import { PDAFunctionData } from '../@models/PDAFunctionData';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService)
  if (authService.isAdmin()) {
    return true
  }

  let router = inject(Router)
  let _IAlert = inject(IAlertToken)

  var auth = authService.isAuth()
  if (!auth.succ) {
    alert(auth.message)
    return router.createUrlTree(['login'])
  }

  // let routeRoles: string[] = route.data['roles'] || []
  let func_code: string = route.data['func_code']
  if (!func_code) {
    return true
  }

  // function handle(bool: boolean) {
  //   if (bool) {
  //       return true
  //     }
  //     else {
  //       _IAlert.AlertError('沒有權限')

  //       return false
  //       // return router.navigateByUrl('/manage')
  //     }
  // }

  let promise: Promise<boolean>

  let isParent = PDAFunctionData.isParent(func_code)
  if (isParent){
    promise = authService.hasPermissionByParent(func_code)
  } else{
    promise = authService.hasPermission(func_code)
  }

  return promise.then(bool => {
    if (bool) {
      return true
    }
    else {
      _IAlert.AlertError('沒有權限')

      return false
      // return router.navigateByUrl('/manage')
    }
  })

  
};




