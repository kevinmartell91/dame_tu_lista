import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { Product } from '../../../../core/retailer/types/product';
import { STORE_CONFIG } from '../../../../core/store/store_config';
import { updateBuyerNavagation } from '../../helpers/buyerNavegation.helper';
import { filterProductsByVariety } from '../../helpers/product.helper';
import { RetailerStoreStore } from '../../services/retailer.store';

@Component({
  selector: 'app-variety-products',
  templateUrl: './variety-products.component.html',
  styleUrls: ['./variety-products.component.sass'],
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
    public retailerStoreStore: RetailerStoreStore
  ) {
    this.initializeViewSettings();
  }

  ngOnInit(): void {
    console.log('object', this.category);

    this.subscription = this.activatedRoute.paramMap.subscribe((params) => {
      this.category = params.get('categoryName');
      console.log('object', this.category);
      this.retailer_id = params.get('retailer_store_name');

      console.log('this.categorythis.category', this.category);

      setTimeout(() => {
        updateBuyerNavagation(
          this.buyerNavegationStore,
          BUYER_CONFIG.navegation.varietyView,
          this.category
        );
      }, 10);
    });
  }

  /**
   *  By unsubscribing, It prevents memory leak
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeViewSettings(): void {
    // updateBuyerNavagation(
    //   this.buyerNavegationStore,
    //   BUYER_CONFIG.navegation.varietyView,
    //   this.category
    // );
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

  public goToRetailerMaturityView(): void {
    let variety = this.productSelected.varietyName;
    // this.route.navigate(['tienda-vendedor',this.retailer_id ,'madurez', this.category, variety, this.productSelected.isOrganic]);
    this.route.navigate([
      this.retailerStoreStore.state.retailer.store.nameUrl,
      'madurez',
      this.category,
      variety,
      this.productSelected.isOrganic,
    ]);
  }

  public _filterAllProductsByVariety(
    category: string,
    products: Product[]
  ): Product[] {
    return filterProductsByVariety(category, products);
  }
}
