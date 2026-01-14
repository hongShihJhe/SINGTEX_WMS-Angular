import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../@services/auth-service';
import { SweetAlert2Helper } from '../@utils/SweetAlert2Helper';

export const adminGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService)
  let router = inject(Router)

  var auth = authService.isAuth()
  if (!auth.succ){
    alert(auth.message)
    return router.createUrlTree(['login'])
  }


  let userRoles = authService.user?.roles || []
  let allowedRoles: string[] = ['admin']

  if (allowedRoles && allowedRoles.length > 0){
    if (!authService.isAdmin()){
      let has_permission = userRoles.some(x => allowedRoles.includes(x))
      if (has_permission){
        return true
      } else {
        SweetAlert2Helper.AlertError('沒有權限')
        return false
      }
    }
  }
  
  return true;
};
