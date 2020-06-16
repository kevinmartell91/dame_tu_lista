import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/core/retailer/types/product';
import { Retailer } from "../../core/retailer/types/retailer";
import { Router, ActivatedRoute } from '@angular/router';
import { Location, PlatformLocation } from '@angular/common';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BuyerNavegation } from 'src/app/core/buyer/types/buyer-navegation';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { updateBuyerNavagation } from "./helpers/buyerNavegation.helper";
import { RetailerStoreStore } from './services/retailer.store';

@Component({
  selector: 'app-retailer-stores',
  templateUrl: './retailer-stores.component.html',
  styleUrls: ['./retailer-stores.component.sass']
})
export class RetailerStoresComponent implements OnInit {

  subscribedParamRetailerId: string;
  retailer: Retailer;

  constructor( 
    private readonly route: ActivatedRoute,
    private location: Location,
    private retailerStoreStore: RetailerStoreStore 
  ) { }
    
    ngOnInit(): void {
    // init(): void {

    this.route.paramMap.subscribe( params => {
      this.subscribedParamRetailerId = params.get("retailer_id");
      console.log("retailer_id",this.subscribedParamRetailerId);
    });
    console.log("RetailerStoresComponent was realoaded");
    this.retailerStoreStore.getRetailer(this.subscribedParamRetailerId);
  }
  

}
