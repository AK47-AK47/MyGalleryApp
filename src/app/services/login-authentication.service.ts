import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthenticationService {
  constructor() {}

  //authenticateUser(data: { user: string|undefined; pass: string|undefined }) {
  authenticateUser( username: string | null | undefined, password: string | null | undefined
  ){
    console.log('data I:', username);
    console.log('data II:', password);

    const AuthObservable = new Observable((subscriber) => {
      if(username === "test" && password==="12345"){
        subscriber.next(true);
      }
      else{
        subscriber.next(false);
      }
    });

    return AuthObservable;
  }
}
