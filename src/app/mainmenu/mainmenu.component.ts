import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectLoginStatus } from '../store/login.selector';
import { Subscription } from 'rxjs';
import { logoutAction } from '../store/login.actions';

@Component({
  selector: 'app-mainmenu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './mainmenu.component.html',
  styleUrl: './mainmenu.component.css',
})
export class MainmenuComponent implements OnInit, OnDestroy {
  
  protected isLoggedIn: boolean = false;
  private loginStatusSubscription$ = new Subscription();
  
  constructor(private store: Store, private router:Router) {}
  
  logout(){
    this.store.dispatch(logoutAction());
    this.router.navigateByUrl("/login");
  }

  ngOnInit(): void {
    this.loginStatusSubscription$ = this.store
      .select(selectLoginStatus)
      .subscribe((loginStatus) => (this.isLoggedIn = loginStatus));
  }

  ngOnDestroy(): void {
    if(this.loginStatusSubscription$){
      this.loginStatusSubscription$.unsubscribe();
    }
  }
}
