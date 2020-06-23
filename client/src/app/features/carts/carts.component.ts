import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartStore } from 'src/app/core/cart/services/cart.store';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { Subscription } from 'rxjs';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { updateBuyerNavagation } from '../retailer-stores/helpers/buyerNavegation.helper';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { STORE_CONFIG } from 'src/app/core/store/store_config';

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

}
