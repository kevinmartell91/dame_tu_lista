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
import { filterAllProductsByCategory } from '../../helpers/product.helper';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.sass']
})
export class CategoryProductsComponent implements OnDestroy{

  // @Input() storeProducts: Product; 
  public categoryView: string;
  public question: string;
  public retailer: Retailer;
  public productsList: Product[];
  public productSelected: Product;
  subscription: Subscription;


  constructor(
    private router: Router,
    private buyerNavegationStore: BuyerNavegationStore,
    private location: Location,
    private platformLocation: PlatformLocation,
    private retailerStoreStore: RetailerStoreStore
  ) { 

    this.init();
    // this.listenBrowserBackButton();

    /**
     * TODO prevent meory leak on components that are subscribesd to stores 
     */
    this.subscription = this.retailerStoreStore.retailer$.subscribe(
      x => {
        console.log("HERE HERE =>CATEGORYProductsComponent - SUBCRIBE");
        this.retailer = x;
        this.productsList = filterAllProductsByCategory( x.store.productsList);
        // this.productsList = [x.store.productsList[0]];
        console.log("CATEGORYProductsComponent - PRODUCTS ", this.productsList);
      }
    )
  } 

  init(): void {

    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.categoryView
    );

    this.categoryView = STORE_CONFIG.view_type.categoryView;
    this.question = STORE_CONFIG.question_view_type.categoryView;
  }

  ngOnDestroy(): void {
    //prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  /**
   * Listen to childre component(product-displaycomponent)
   * @param product product selected on children 
   * cmponenet
   */
  public onSelected(product: Product){
    // store product category name
    // localStorage.setItem(LOGIN_CONFIG.loginUserStorage, JSON.stringify(loginUser));

    // let productSelected =  {
    //   categoryName: product.categoryName,
    //   varietyName: '',
    //   maturityName: ''
    // };

    // localStorage.setItem('productSelected', JSON.stringify(productSelected));
    this.productSelected = product;
    // this.buyerNavegationStore.setNewCategoryProductState(product.categoryName);
    this.goToRetailerVarietyView();
  } 

  public goToRetailerVarietyView(): void {
    this.router.navigate(['/retailer-store', this.retailer._id,'variety-view']);
  }

}
