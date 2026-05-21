import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../@services/auth-service';
import { IAlertToken } from '../@interfaces/IAlert';

export const adminGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService)
  let router = inject(Router)
  let _IAlert = inject(IAlertToken)

  if (authService.isAdmin()){
    return true
  } else {
    _IAlert.AlertError('沒有權限')
    return false
  }

};
