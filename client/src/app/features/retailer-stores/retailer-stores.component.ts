import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from 'src/app/core/retailer/types/product';
import { Retailer } from "../../core/retailer/types/retailer";
import { Router, ActivatedRoute } from '@angular/router';
import { Location, PlatformLocation } from '@angular/common';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BuyerNavegation } from 'src/app/core/buyer/types/buyer-navegation';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { updateBuyerNavagation } from "./helpers/buyerNavegation.helper";
import { RetailerStoreStore } from './services/retailer.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-retailer-stores',
  templateUrl: './retailer-stores.component.html',
  styleUrls: ['./retailer-stores.component.sass'],
  providers: [RetailerStoreStore]
})
export class RetailerStoresComponent implements OnDestroy {

  subscribedParamRetailerId: string;
  retailer: Retailer;
  subscribe: Subscription

  constructor( 
    private readonly route: ActivatedRoute,
    private retailerStoreStore: RetailerStoreStore 
  ) { 

    this.init();
  }
    
  init(): void {

    this.subscribe = this.route.paramMap.subscribe( params => {
      this.subscribedParamRetailerId = params.get("retailer_id");
    });
    this.retailerStoreStore.getRetailer(this.subscribedParamRetailerId);
  }

  ngOnDestroy():void {
    this.subscribe.unsubscribe();
  }
}
