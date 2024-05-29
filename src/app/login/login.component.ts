import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, } from '@angular/forms';

import { LoginAuthenticationService } from '../services/login-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private loginAuthService: LoginAuthenticationService, private router:Router) {}

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
    ).subscribe(isAuthenticated => {
      if(isAuthenticated){
        console.log('Correct credentials. Logged in:', isAuthenticated);
        this.router.navigateByUrl('/photos');
      }
      else{
        console.log('Wrong credentials. Logged in:', isAuthenticated);
      }
    })
  }
}
