import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthenticationService } from './core/services/authentication.service';
import { AuthenticationStore } from "./core/login/services/authentication.store";
// import { LoginUser } from './features/login/models/login-user.model';
import { LoginUser } from "./core/login/types/user";
import { BuyerNavegationStore } from "./core/buyer/services/buyer-navegation.store";
import { BuyerNavegation } from './core/buyer/types/buyer-navegation';
import { BUYER_CONFIG } from "./core/buyer/buyer.config";
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Dame tu lista';
  loginUser: LoginUser;

  navegation: {
    accountView,
    storeView,
    categoryView,
    maturityView
  };


  constructor(
    private router: Router,
    private authenticationStore: AuthenticationStore,
    public buyerNavegationStore: BuyerNavegationStore,
    private location: Location
  ) {

    this.initializeNavegationValues();

    this.authenticationStore.loginUser$.subscribe( 
      x => { this.loginUser = x }
    );

  }
  
  initializeNavegationValues(): void {
    this.navegation = BUYER_CONFIG.navegation;  
  }

  viewBuyerCart(): void {
    this.router.navigate(['/buyer-cart']);
  }

  viewBuyerDetails():void {
    this.router.navigate(['/buyer-details']);
  }

  goBackLocation(): void {
    this.location.back();
  }

  logout() {
    this.authenticationStore.logout();
    this.router.navigate(['/login']);
  }
}
