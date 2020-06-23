import { Component, OnDestroy } from '@angular/core';
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
import { CartStore } from './core/cart/services/cart.store';
import { Subscription } from 'rxjs';
import { ShoppingCart } from './core/cart/types/shopping-cart';
import { CartProduct } from './core/cart/types/cart-product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnDestroy{
  title = 'Dame tu lista';
  loginUser: LoginUser;
  cartProductsQuantity: number = 0;
  cartProducts: CartProduct[];

  authenticationSubcription: Subscription;
  cartStoreSubcription: Subscription;
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
    cartView
  };

  constructor(
    private router: Router,
    private authenticationStore: AuthenticationStore,
    public buyerNavegationStore: BuyerNavegationStore,
    private location: Location,
    public cartStore: CartStore
  ) {

    this.initializeNavegationValues();
    this.initializeLoginTypeValues();

    this.authenticationSubcription = this.authenticationStore.loginUser$.subscribe( 
      x => { 
        this.loginUser = x;
        console.log("APP COMPONENT - subscribe - loginUser$", this.loginUser); 
      }
    );

    this.cartStoreSubcription = this.cartStore.shoppingCart$.subscribe(
      y => {
        this.cartProducts = y.products;
        this.cartProductsQuantity = y.products.length;
      }
    )
  }

  ngOnDestroy() {
    this.authenticationSubcription.unsubscribe();
    this.cartStoreSubcription.unsubscribe();
  }
  
  initializeNavegationValues(): void {
    this.navegation = BUYER_CONFIG.navegation; 
  }

  initializeLoginTypeValues(): void {
    this.loginType = LOGIN_CONFIG.loginType; 
  }

  viewBuyerCart(): void {
    this.router.navigate(['/personal-cart']);
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
