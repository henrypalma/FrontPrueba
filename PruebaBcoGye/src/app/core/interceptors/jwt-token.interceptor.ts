import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const jwtTokenInterceptor: HttpInterceptorFn = (request, next) => {

  const authService = inject( AuthService );
  const currentUser = authService.currentUserAuthenticated();

  if (authService.isAuthenticated()) {
    if( request.method == 'GET')

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser.token}`,
            },
        });

    else
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser.token}`,
                'Content-Type': 'application/json'
            },
        });
}

  return next(request);
};
