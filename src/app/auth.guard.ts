import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginAuthenticationService } from './services/login-authentication.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(LoginAuthenticationService);
  const router = inject(Router);
  let isAuth = false;
  /**
   * implement with  Observable
   */
  
  /**
   * implement with  Observable
   */
  
  if (authService.AuthObservable){
    authService.AuthObservable.subscribe((isAuthenticated) => {
      console.log('In Guard -> AuthService execution -> ');
      if (isAuthenticated) {
        console.log('Guard response to authentication:', isAuthenticated);
        isAuth = true;
      } else {
        console.log('Guard response to authentication:', isAuthenticated);
        router.navigateByUrl('/login');
        isAuth = false;
      }
    });
  }
  else{
    console.log("In Guard -> no AuthService execution -> isAyth:", isAuth);
  }
  return isAuth;

  /**
   * implement with BehaviorSubject<boolean> subclass of Observable 
   * 
   *
  console.log('isAuth:', authService.authenticateUser);
  if (authService.AuthObservable.value) {
    console.log('authService.AuthObservable:', authService.AuthObservable.value);
    return true;
  } else {
    console.log('authService.AuthObservable:', authService.AuthObservable.getValue());
    router.navigateByUrl('/login');
    return false;
  }
  */
 
};
