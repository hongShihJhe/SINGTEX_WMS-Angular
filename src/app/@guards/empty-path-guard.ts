import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../@services/auth-service';

export const emptyPathGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService)
  let router = inject(Router)

  var auth = authService.isAuth()
  if (auth.succ){
    return router.createUrlTree(['manage', 'home'])
  } else{
    return router.createUrlTree(['login'])
  }
};
