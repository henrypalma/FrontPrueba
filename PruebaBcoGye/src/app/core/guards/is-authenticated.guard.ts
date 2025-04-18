import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );
  const router = inject( Router );


  const isAuthenticated = authService.isAuthenticated();
  if (!isAuthenticated) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
  }

  return isAuthenticated;

};
