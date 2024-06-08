import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginAuthenticationService } from './services/login-authentication.service';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoginStatus } from './store/login.selector';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  
  const authService = inject(LoginAuthenticationService);
  const store = inject(Store);
  const router = inject(Router);
  let isLoggedIn = false;
  store.select(selectLoginStatus).subscribe(loginStatus => isLoggedIn = loginStatus)
  
  /**
   * implement with simplicity
   */
  //first check the store from localstorage
  console.log('In Guard -> AuthService checking -> ');
  if (isLoggedIn){
    console.log('Guard response to authentication:', isLoggedIn);
    console.log('Guard says go to path: ', state.url);
    return true;
  }
  else {
    console.log('Guard response to authentication:', isLoggedIn);
    console.log("Guard says go to path: /login");
    router.navigateByUrl("/login");
    return false;
  }
};


