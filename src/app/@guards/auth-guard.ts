import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../@services/auth-service';
import { IAlertToken } from '../@interfaces/IAlert';

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
  let func: string = route.data['func']
  if (!func) {
    return true
  }

  return authService.hasPermission(func).then(bool => {
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
