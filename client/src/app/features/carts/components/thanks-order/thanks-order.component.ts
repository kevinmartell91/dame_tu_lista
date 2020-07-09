import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderStore } from 'src/app/core/order/sevices/order.store';
import { Subscription } from 'rxjs';
import { updateBuyerNavagation } from 'src/app/features/retailer-stores/helpers/buyerNavegation.helper';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { CartStore } from 'src/app/core/cart/services/cart.store';

@Component({
  selector: 'app-thanks-order',
  templateUrl: './thanks-order.component.html',
  styleUrls: ['./thanks-order.component.sass']
})
export class ThanksOrderComponent implements OnInit {

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
  
  redirectoRetailStore():void {
    this.router.navigate(['retailer-store', this.retailer_id ]);
  }
  
  initializeViewSettings():void {
    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.thanksView
    );
    
  }

}
