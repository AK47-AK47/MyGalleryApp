import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, } from '@angular/forms';

import { LoginAuthenticationService } from '../services/login-authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private loginAuthService: LoginAuthenticationService) {}

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    console.log('Your form data:', this.loginForm.value);
    
    const credentials = this.loginForm.value;

    this.loginAuthService.authenticateUser(
      credentials.username,
      credentials.password
    ).subscribe((isLoggedIn) => {console.log('access:', isLoggedIn);});
  }
}
