import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BUYER_CONFIG } from "./core/buyer/buyer.config";
import { LOGIN_CONFIG } from "./core/login/login.config";
import { AuthenticationStore } from "./core/login/services/authentication.store";
import { LoginUser } from "./core/login/types/user";
import { BuyerNavegationStore } from "./core/buyer/services/buyer-navegation.store";
import { Location } from '@angular/common';
import { updateBuyerNavagation } from './features/retailer-stores/helpers/buyerNavegation.helper';
import { PlatformLocation } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Dame tu lista';
  loginUser: LoginUser;

  loginType: {
    buyer,
    retailer
  }; 

  navegation: {
    accountView,
    storeView,
    categoryView,
    varietyView,
    maturityView
  };

  constructor(
    private router: Router,
    private authenticationStore: AuthenticationStore,
    public buyerNavegationStore: BuyerNavegationStore,
    private location: Location,
    private platformLocation: PlatformLocation
  ) {

    this.initializeNavegationValues();
    this.initializeLoginTypeValues();

    this.authenticationStore.loginUser$.subscribe( 
      x => { this.loginUser = x;
      console.log("loginUser$.subscribe", this.loginUser); }
    );

    // this.platformLocation.onPopState(() => {
    //   console.log("press back in add in APP COMPONENT!!!");
    // })
  }
  
  initializeNavegationValues(): void {
    this.navegation = BUYER_CONFIG.navegation; 
  }
  initializeLoginTypeValues(): void {
    this.loginType = LOGIN_CONFIG.loginType; 
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
  
  goBackLocation(): void {

    let newBuyerNavegationView ;

    switch (this.buyerNavegationStore.state.buyerNavegation.typeView) {

      case this.navegation.categoryView:
        newBuyerNavegationView = this.navegation.storeView;
        break;

      case this.navegation.varietyView:
        newBuyerNavegationView = this.navegation.categoryView;
        break;
    
      case this.navegation.maturityView:
        newBuyerNavegationView = this.navegation.varietyView;
        break;
    
      default: // this.navegation.StoreView:
        newBuyerNavegationView = this.navegation.accountView;
        break;
    }

    updateBuyerNavagation(
      this.buyerNavegationStore,
      newBuyerNavegationView
    );

    this.location.back();
  }

}
