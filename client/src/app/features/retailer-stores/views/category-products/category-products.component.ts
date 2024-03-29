import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { Product } from "../../../../core/retailer/types/product";
import { STORE_CONFIG } from "../../../../core/store/store_config";
import { updateBuyerNavagation } from '../../helpers/buyerNavegation.helper';
import { filterAllProductsByCategory } from '../../helpers/product.helper';
import { RetailerStoreStore } from '../../services/retailer.store';


@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.sass']
})
export class CategoryProductsComponent implements OnInit, OnDestroy{

  public categoryView: string;
  public question: string;
  public productSelected: Product;

  // url params attributes
  public retailerStoreName: string;
  
  subscription: Subscription;

  constructor(
    private router: Router,
    private buyerNavegationStore: BuyerNavegationStore,
    public retailerStoreStore: RetailerStoreStore,
    private readonly activatedRoute: ActivatedRoute,
  ) { 

    this.initializeViewSettings();
  
  } 

  ngOnInit(): void {

    // this.subscription = this.activatedRoute.paramMap.subscribe( params => {
    //   // this.retailerStoreName = params.get("retailerStoreName")
      // this.retailerStoreName = params.get("retailer_store_name")
    //   console.log("HERE", params );
    // });

    this.retailerStoreName = localStorage.getItem("retailer_store_name");

  }

  /**
   *  By unsubscribing, It prevents memory leak
   */
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  private initializeViewSettings(): void {
    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.categoryView,
      "navegation.categoryView"
    );
  
    this.categoryView = STORE_CONFIG.view_type.categoryView;
    this.question = STORE_CONFIG.question_view_type.categoryView;
  }

  /**
   * Listen to childre component(product-displaycomponent)
   * @param product product selected on children 
   * component  
   */
  public onSelected(product: Product){
    this.productSelected = product;
    this.buyerNavegationStore.setNewCategoryProductState(product.categoryName);
    this.goToRetailerVarietyView();
  } 

  public goToRetailerVarietyView(): void {
    let category = this.productSelected.categoryName;
    // this.router.navigate(['/tienda-vendedor', this.retailerStoreName,'variedad',category],);
    this.router.navigate([ this.retailerStoreName,'variedad',category],);
  }

  public _filterAllProductsByCategory(products: Product[]): Product[] {
    return filterAllProductsByCategory(products);
  }

}
