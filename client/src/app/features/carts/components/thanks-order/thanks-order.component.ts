import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { CartStore } from 'src/app/core/cart/services/cart.store';
import { updateBuyerNavagation } from 'src/app/features/retailer-stores/helpers/buyerNavegation.helper';

@Component({
  selector: 'app-thanks-order',
  templateUrl: './thanks-order.component.html',
  styleUrls: ['./thanks-order.component.sass']
})
export class ThanksOrderComponent implements OnInit, OnDestroy {

  retailer_id: string;
  subscription: Subscription;

  constructor(
    private router: Router,
    private cartStore: CartStore,
    private buyerNavegationStore: BuyerNavegationStore
  ) { 
    
    this.initializeViewSettings();

    this.subscription = this.cartStore.favoriteRetailerSelected$.subscribe( 
      x => {
        this.retailer_id = x._id;
      }
    )

  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  redirectoRetailStore():void {
    this.router.navigate(['tienda-vendedor', this.retailer_id ]);
  }
  
  initializeViewSettings():void {
    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.thanksView
    );
    
  }

}
