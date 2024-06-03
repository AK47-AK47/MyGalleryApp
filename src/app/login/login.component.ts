import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LoginAuthenticationService } from '../services/login-authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {

  private authSubscription$ = new Subscription();
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private loginAuthService: LoginAuthenticationService,
    private router: Router
  ) {}

  login() {
    console.log('Your form data:', this.loginForm.value);

    const credentials = this.loginForm.value;

    this.authSubscription$ = this.loginAuthService
      .authenticateUser(credentials.username, credentials.password)
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          console.log('Correct credentials. Logged in:', isAuthenticated);
          this.router.navigateByUrl('/photos');
        } else {
          console.log('Wrong credentials. Logged in:', isAuthenticated);
        }
      });
  }

  ngOnDestroy(): void {
    if(this.authSubscription$){
      this.authSubscription$.unsubscribe();
    }
  }
}
