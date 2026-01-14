import { inject } from '@angular/core';
import { AuthService } from './../@services/auth-service';
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let authService = inject(AuthService)
  let token = authService.token
  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', 'bearer ' + token)
    });
  }
  return next(req);
};
