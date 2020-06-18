import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { STORE_CONFIG } from "../../../../core/store/store_config";
import { Product } from "../../../../core/retailer/types/product";

import { Router } from '@angular/router';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { updateBuyerNavagation } from '../../helpers/buyerNavegation.helper';
import { Location, PlatformLocation } from '@angular/common';
import { RetailerStoreStore } from '../../services/retailer.store';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { filterProductsByVariety } from '../../helpers/product.helper';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-variety-products',
  templateUrl: './variety-products.component.html',
  styleUrls: ['./variety-products.component.sass']
})
export class VarietyProductsComponent implements OnDestroy {

  // @Input() storeProducts: Product; 
  public varietyView: string;
  public question: string;
  public retailer: Retailer;
  public productsList: Product[];
  public productSelected: Product;
  public subscription: Subscription;

  constructor(
    private route: Router,
    private buyerNavegationStore: BuyerNavegationStore,
    private location: Location,
    private platformLocation: PlatformLocation,
    private retailerStoreStore: RetailerStoreStore
  ) { 

    this.init();
    // JSON.parse(localStorage.getItem(LOGIN_CONFIG.loginUserStorage)).token;

    this.refreshDataFromLocalStorage();

    this.subscription = this.retailerStoreStore.retailer$.subscribe(
      x => {
        console.log("VARIETYProductsComponent - SUBCRIBE");
        this.retailer = x;
        this.productsList = filterProductsByVariety( buyerNavegationStore.state.categoryProduct, x.store.productsList);
        console.log("CATEGORY SELECTED = > ",buyerNavegationStore.state.categoryProduct);
        console.log("VARIETYProductsComponent  product => ", this.productsList);
      }
    )
  }

  init(): void {
    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.varietyView
    );
    this.varietyView = STORE_CONFIG.view_type.varietyView;
    this.question = STORE_CONFIG.question_view_type.varietyView;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refreshDataFromLocalStorage() :void {
    let categotyNameLocalStorage = JSON.parse(localStorage.getItem('productSelected')).categoryName;
   
    if( categotyNameLocalStorage !== '') {

      this.buyerNavegationStore.setNewCategoryProductState(categotyNameLocalStorage);
    }
  }

  /**
   * Listen to childre component(product-displaycomponent)
   * @param product product selected on children 
   * cmponenet
   */
  public onSelected(product: Product): void {
    this.productSelected = product;
    this.buyerNavegationStore.setNewVarietyProductState(product.varietyName);
    this.goToRetailerMaturityView();
  }

  public goToRetailerMaturityView():void {
    this.route.navigate(['retailer-store',this.retailer._id ,'maturity-view']);
  }
}
