import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthenticationService } from './core/services/authentication.service';
import { AuthenticationStore } from "./core/login/services/authentication.store";
// import { LoginUser } from './features/login/models/login-user.model';
import { LoginUser } from "./core/login/types/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Dame tu lista';
  loginUser: LoginUser;

  constructor(
    private router: Router,
    private authenticationStore: AuthenticationStore
  ) {
    this.authenticationStore.loginUser$.subscribe( 
      x => { 
        this.loginUser = x;
      }
    );
  }

  viewBuyerCart(): void {
    this.router.navigate(['/buyer-cart']);
  }

  viewBuyerDetails():void {
    this.router.navigate(['/buyer-details']);
  }

  logout() {
    this.authenticationStore.logout();
    this.router.navigate(['/login']);
  }
}
