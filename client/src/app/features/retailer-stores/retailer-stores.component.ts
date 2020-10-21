import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private readonly route: ActivatedRoute,
    private retailerStoreStore: RetailerStoreStore 
  ) { 

    this.init();
  }
    
  init(): void {

    this.subscribe = this.route.paramMap.subscribe( params => {
      // this.subscribedParamRetailerId = params.get("retailer_id");
      this.subscribedParamRetailerId = params.get("retailer_store_name");
      console.log("RetailerStoresComponent retailer_store_name", this.subscribedParamRetailerId);

    });
    // this.retailerStoreStore.getRetailer(this.subscribedParamRetailerId);
    this.retailerStoreStore.getRetailerByNameStore(this.subscribedParamRetailerId);
    console.log(this.retailerStoreStore);
    if(this.retailerStoreStore.state.retailer == null ){
      this.router.navigate(['/**']);
    }
  }

  ngOnDestroy():void {
    this.subscribe.unsubscribe();
  }
}
