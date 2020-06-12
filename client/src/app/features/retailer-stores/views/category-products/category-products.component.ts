import { Component, OnInit, Input} from '@angular/core';
import { STORE_CONFIG } from "../../../../core/store/store_config";
import { Product } from "../../../../core/retailer/types/product";
import { Router } from '@angular/router';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { updateBuyerNavagation } from '../../helpers/buyerNavegation.helper';
import { Location, PlatformLocation } from '@angular/common';


@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.sass']
})
export class CategoryProductsComponent implements OnInit {

  @Input() storeProducts: Product; 
  public categoryView: string;
  public question: string;

  constructor(
    private router: Router,
    private buyerNavegationStore: BuyerNavegationStore,
    private location: Location,
    private platformLocation: PlatformLocation
  ) { 
    this.listenBrowserBackButton();
  }

  ngOnInit(): void {
    this.categoryView = STORE_CONFIG.view_type.categoryView;
    this.question = STORE_CONFIG.question_view_type.categoryView;
  }

  goToRetailerVarietyView(): void {
    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.varietyView
    );
    this.router.navigate(['/retailer-store/variety-view']);
  }

  listenBrowserBackButton():void {
    this.platformLocation.onPopState(() => {
      updateBuyerNavagation(
        this.buyerNavegationStore,
        BUYER_CONFIG.navegation.storeView
      );
    });
    console.log("browser buttons");
  }

}
