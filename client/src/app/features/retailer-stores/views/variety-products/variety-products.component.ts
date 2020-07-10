import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { STORE_CONFIG } from "../../../../core/store/store_config";
import { Product } from "../../../../core/retailer/types/product";

import { Router, ActivatedRoute } from '@angular/router';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { updateBuyerNavagation } from '../../helpers/buyerNavegation.helper';
import { RetailerStoreStore } from '../../services/retailer.store';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { filterProductsByVariety } from '../../helpers/product.helper';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-variety-products',
  templateUrl: './variety-products.component.html',
  styleUrls: ['./variety-products.component.sass']
})
export class VarietyProductsComponent implements OnInit, OnDestroy {

  public varietyView: string;
  public question: string;
  public retailer: Retailer;
  public productSelected: Product;


  // url params attributes
  public category: string;
  public variety: string;
  public retailer_id: string;

  public subscription: Subscription;

  constructor(
    private route: Router,
    private readonly activatedRoute: ActivatedRoute,
    private buyerNavegationStore: BuyerNavegationStore,
    public retailerStoreStore: RetailerStoreStore,
  ) { 

    this.initializeViewSettings();

  }

  ngOnInit(): void {

    this.subscription = this.activatedRoute.paramMap.subscribe( params => {
      this.category = params.get("categoryName");
      this.retailer_id = params.get("retailer_id")
    });

  }

  /**
   *  By unsubscribing, It prevents memory leak
   */ 
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeViewSettings(): void {
    
    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.varietyView
    );
    this.varietyView = STORE_CONFIG.view_type.varietyView;
    this.question = STORE_CONFIG.question_view_type.varietyView;
    
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
    let variety = this.productSelected.varietyName;
    this.route.navigate(['tienda-vendedor',this.retailer_id ,'madurez', this.category, variety, this.productSelected.isOrganic]);
  }

  public _filterAllProductsByVariety(category: string, products: Product[]): Product[] {
    return filterProductsByVariety(category, products);
  }

}