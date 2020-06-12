import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/types/product';
import { Retailer } from "../../core/retailer/types/retailer";
import { Router } from '@angular/router';
import { Location, PlatformLocation } from '@angular/common';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BuyerNavegation } from 'src/app/core/buyer/types/buyer-navegation';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { updateBuyerNavagation } from "./helpers/buyerNavegation.helper";

@Component({
  selector: 'app-retailer-stores',
  templateUrl: './retailer-stores.component.html',
  styleUrls: ['./retailer-stores.component.sass']
})
export class RetailerStoresComponent implements OnInit {


  constructor( 
    private router: Router,
    private location: Location,
    private platformLocation: PlatformLocation,
    private buyerNavegationStore: BuyerNavegationStore ) { }

  ngOnInit(): void {
  }
  


  // blockBrowserBackButton():void {
  //   this.platformLocation.onPopState(() => {
  //     history.forward();
  //   })
  // }
}
