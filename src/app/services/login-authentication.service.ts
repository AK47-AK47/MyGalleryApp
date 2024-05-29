import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthenticationService {
  /**
   * implement with BehaviorSubject<boolean> subclass of Observable, for multicasting
   *
  public AuthObservable = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  authenticateUser(
    username: string | null | undefined,
    password: string | null | undefined
  ) {
    console.log('data I:', username);
    console.log('data II:', password);

    if (username === 'test' && password === '12345') {
      this.AuthObservable.next(true);
      this.router.navigateByUrl('/photos');
    } else {
      this.AuthObservable.next(false);
    }
    return this.AuthObservable;
  }
  */
  /**
   *  implement with Observable
   */
  public AuthObservable: Observable<boolean> | undefined;

  constructor(private router: Router) {}

  authenticateUser(
    username: string | null | undefined,
    password: string | null | undefined
  ) {
    console.log('data I:', username);
    console.log('data II:', password);

    this.AuthObservable = new Observable((subscriber) => {
      if (username === 'test' && password === '12345') {
        subscriber.next(true);
      } else {
        subscriber.next(false);
      }
    });

    return this.AuthObservable;
  }
}
