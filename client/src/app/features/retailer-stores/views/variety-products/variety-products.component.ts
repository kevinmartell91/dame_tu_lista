import { Component, OnInit, Input} from '@angular/core';
import { STORE_CONFIG } from "../../../../core/store/store_config";
import { Product } from "../../../../core/retailer/types/product";

import { Router } from '@angular/router';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { updateBuyerNavagation } from '../../helpers/buyerNavegation.helper';
import { Location, PlatformLocation } from '@angular/common';


@Component({
  selector: 'app-variety-products',
  templateUrl: './variety-products.component.html',
  styleUrls: ['./variety-products.component.sass']
})
export class VarietyProductsComponent implements OnInit {

  @Input() storeProducts: Product; 
  public varietyView: string;
  public question: string;

  constructor(
    private route: Router,
    private buyerNavegationStore: BuyerNavegationStore,
    private location: Location,
    private platformLocation: PlatformLocation
  ) { 
    this.listenBrowserBackButton();
  }

  ngOnInit(): void {
    this.varietyView = STORE_CONFIG.view_type.varietyView;
    this.question = STORE_CONFIG.question_view_type.varietyView;
  }


  // goBackToCategoryView(): void {
  //   updateBuyerNavagation(
  //     this.buyerNavegationStore,
  //     BUYER_CONFIG.navegation.categoryView
  //   )
  //   this.location.back();
  // }


  goToRetailerMaturityView():void {
    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.maturityView
    );
    this.route.navigate(['retailer-store/maturity-view']);
  }

  listenBrowserBackButton():void {
    this.platformLocation.onPopState(() => {
      updateBuyerNavagation(
        this.buyerNavegationStore,
        BUYER_CONFIG.navegation.categoryView
      );
    })
  }

}
