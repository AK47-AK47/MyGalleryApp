import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginAuthenticationService } from './services/login-authentication.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  const authService = inject(LoginAuthenticationService);
  const router = inject(Router);
  

  console.log("state:",state);
  /**
   * implement with simplicity
   */
  console.log('In Guard -> AuthService checking -> ');
  if (authService.isLoggedIn){
    console.log('Guard response to authentication:', authService.isLoggedIn);
    console.log('Guard says go to path: ', state.url);
    return true;
  }
  else {
    console.log('Guard response to authentication:', authService.isLoggedIn);
    console.log("Guard says go to path: /login");
    router.navigateByUrl("/login");
    return false;
  }
};
