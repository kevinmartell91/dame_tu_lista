import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { STORE_CONFIG } from "../../../../core/store/store_config";
import { Product } from "../../../../core/retailer/types/product";
import { PlatformLocation, Location } from '@angular/common';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { updateBuyerNavagation } from '../../helpers/buyerNavegation.helper';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { RetailerStoreStore } from '../../services/retailer.store';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import {filterProductsByMaturity} from '../../helpers/product.helper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-maturity-products',
  templateUrl: './maturity-products.component.html',
  styleUrls: ['./maturity-products.component.sass']
})
export class MaturityProductsComponent implements OnDestroy {

  // @Input() storeProducts: Product; 
  public maturityView: string;
  public question: string;

  public retailer: Retailer;
  public productsList: Product[];
  public productSelected: Product;

  public subscription: Subscription;

  constructor( 
    private buyerNavegationStore: BuyerNavegationStore,
    private platformLocation: PlatformLocation,
    private retailerStoreStore: RetailerStoreStore,
    private location: Location
  ) {

    this.init();

    this.subscription = this.retailerStoreStore.retailer$.subscribe(
      x => {
        console.log("MaturityProductsComponent - SUBCRIBE");
        console.log("buyerNavegationStore.state.categoryProduct ==>", buyerNavegationStore.state.categoryProduct);
        this.retailer = x;
        this.productsList = filterProductsByMaturity(
          buyerNavegationStore.state.categoryProduct,
          buyerNavegationStore.state.varietyProduct, 
          x.store.productsList);
          
        
        console.log("VARIETY SELECTED = > ",buyerNavegationStore.state.varietyProduct);
        console.log("MaturityProductsComponent - products", this.productsList);
      }
    )
  }
    
  init(): void {
    
    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.maturityView
    );
    
    this.maturityView = STORE_CONFIG.view_type.maturityView;
    this.question = STORE_CONFIG.question_view_type.maturityView;
  }

  // goBackToCategoryView(): void {
  //   this.location.back();
  // }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  public onSelected(product: Product){
    this.productSelected = product;
  }
}
