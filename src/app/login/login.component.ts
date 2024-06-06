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
export class LoginComponent {

  protected loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  public isAuth: boolean = false;

  constructor(private loginAuthService: LoginAuthenticationService) {}

  login() {
    const credentials = this.loginForm.value;
    console.log('Your form data:', credentials);
    //call the Auth Service to check user credentials
    this.loginAuthService.authenticateUser(credentials.username, credentials.password);
  }
}
