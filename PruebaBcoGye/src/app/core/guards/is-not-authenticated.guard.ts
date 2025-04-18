import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


// PublicGuard - PrivateGuard

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService );
  const router      = inject( Router );

  if ( authService.isAuthenticated() ) {
    router.navigateByUrl('/dashboard');
    return false;
  }

  return true;
};
