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
import { RetailerStoreStore } from './features/retailer-stores/services/retailer.store';
import { map } from 'rxjs/operators';
import { ProductsList } from './features/retailer-stores/types/products-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Dame tu lista';
  loginUser: LoginUser;
  // productsList: ProductsList;

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
    private location: Location
  ) {

    this.initializeNavegationValues();
    this.initializeLoginTypeValues();

    this.authenticationStore.loginUser$.subscribe( 
      x => { 
        this.loginUser = x;
        console.log("APP COMPONENT - subscribe - loginUser$", this.loginUser); 
      }
    );
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
    this.location.back();
  }
}
