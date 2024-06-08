import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, } from 'rxjs';
import { loginAction } from '../store/login.actions';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthenticationService {
  /**
   *  Implement with simplicity
   */
  private isLoggedIn: boolean = false;

  constructor(private store:Store, private router: Router) {}

  authenticateUser(username: string | null | undefined, password: string | null | undefined){
    console.log("AuthService execution ->")
    if (username === 'test' && password === '12345') {
      
      this.isLoggedIn = true;
      //update isLoggenIn property of store
      this.store.dispatch(loginAction());
      
      console.log('Correct credentials. Logged in:', this.isLoggedIn);
      console.log('go to /photos');
      this.router.navigateByUrl('/photos');
      return this.isLoggedIn;
    }
    console.log('Wrong credentials. Logged in:', this.isLoggedIn);
    console.log('stay to /login');
    return this.isLoggedIn
  }
}
