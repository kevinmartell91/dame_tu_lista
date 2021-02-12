import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  retailerStoreName: string;
  subscriptionStoreName: Subscription;

  constructor(
    private router: Router,
    private cartStore: CartStore,
    private activedRoute: ActivatedRoute,
    private buyerNavegationStore: BuyerNavegationStore
  ) { 
    
    console.log("ThanksOrderComponent - constructor");
    this.initializeViewSettings();

    // this.subscription = this.cartStore.favoriteRetailerSelected$.subscribe( 
    //   x => {
    //     this.retailer_id = x._id;
    //   }
    // )

    this.subscriptionStoreName = this.activedRoute.paramMap.subscribe(params => {
      this.retailerStoreName = params.get("retailer_store_name");
    });

  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.subscriptionStoreName.unsubscribe();
  }
  
  redirectoRetailStore():void {
    this.router.navigate([this.retailerStoreName ]);
  }
  
  initializeViewSettings():void {
    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.thanksView,
      "navegation.thanksView"
    );
    
  }

}
