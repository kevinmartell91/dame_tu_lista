import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Retailer } from "../../core/retailer/types/retailer";
import { RetailerStoreStore } from './services/retailer.store';

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
