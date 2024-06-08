import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, } from '@angular/forms';

import { LoginAuthenticationService } from '../services/login-authentication.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectLoginStatus } from '../store/login.selector';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  protected loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  private isLoggedIn: boolean = false;
    
  constructor(
    private loginAuthService: LoginAuthenticationService,
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.store.select(selectLoginStatus).subscribe((loginStatus) => (this.isLoggedIn = loginStatus));

    if(this.isLoggedIn){
      this.router.navigateByUrl('/photos');
    }
    else{
      this.login()}
  }

  login() {
    const credentials = this.loginForm.value;
    console.log('Your form data:', credentials);
    //call the Auth Service to check user credentials
    this.loginAuthService.authenticateUser(
      credentials.username,
      credentials.password
    );
  }
}
