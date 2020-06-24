import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartStore } from 'src/app/core/cart/services/cart.store';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { Subscription } from 'rxjs';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { updateBuyerNavagation } from '../retailer-stores/helpers/buyerNavegation.helper';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { STORE_CONFIG } from 'src/app/core/store/store_config';
import { calculateCartTotalPrice } from 'src/app/core/cart/helpers/cart-helper';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.sass']
})
export class CartsComponent implements OnDestroy {

  cartProducts: CartProduct[] = null ;
  subscription: Subscription;
  maturityView: string;
  question: string;

  totalCartPrice: number = 0;
  totalCartPriceStr: string = "0.00";

  constructor(
    private buyerNavegationStore: BuyerNavegationStore,
    private cartStore: CartStore
  ) { 

    this.init();
    this.initializeViewSettings();
    
  }
  
  init(): void {

    this.subscription = this.cartStore.shoppingCart$.subscribe(
      x => {
        this.cartProducts = x.products;
        this.totalCartPrice = calculateCartTotalPrice(this.cartProducts);
        // formating to two decimals and as a string
        this.totalCartPriceStr = this.totalCartPrice.toFixed(2);
      }
    )
    
  }

  ngOnDestroy(): void {

    this.subscription.unsubscribe();

  }

  private initializeViewSettings(): void {

    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.cartView
    );
    
    this.maturityView = STORE_CONFIG.view_type.cartView;
    this.question = STORE_CONFIG.question_view_type.cartView;

  }

  onCartProductUpdate(cartProductUpdate: CartProduct): void {

 
    this.cartProducts.filter( cp => {
      if(cp._id == cartProductUpdate._id) {
        cp = cartProductUpdate;
      }
    });

    // if cartProduct quatity is 0, 
    // then remove from cartProducts.
    // hadledby this updateCart method
    this.cartStore.updateCart(cartProductUpdate);

    // then update shopping-cart-total price, this is
    // done by the subscriber on the constructor of 
    // this file, then the subscriber in app.component.ts
    // will save in sessionStorage thanks to 
    // saveToTemporaryStorage. This method is called
    // when cartProducts is grather than 0, whic is the
    // case. So this will do the job. Update the 
    // shopping-cart total price and save in SessionStorage.

  }

}
