import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthenticationService {
  /**
   *  Implement with simplicity
   */
  public isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  authenticateUser(username: string | null | undefined, password: string | null | undefined){
    console.log("AuthService execution ->")
    if (username === 'test' && password === '12345') {
      
      this.isLoggedIn = true;

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
