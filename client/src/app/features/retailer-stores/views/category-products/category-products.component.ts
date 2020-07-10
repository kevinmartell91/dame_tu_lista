import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { STORE_CONFIG } from "../../../../core/store/store_config";
import { Product } from "../../../../core/retailer/types/product";
import { Router, ActivatedRoute } from '@angular/router';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { updateBuyerNavagation } from '../../helpers/buyerNavegation.helper';
import { RetailerStoreStore } from '../../services/retailer.store';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { filterAllProductsByCategory, getProductDeserialized } from '../../helpers/product.helper';
import { Subscription } from 'rxjs';
import { TemporaryStorageFacet, TemporaryStorageService } from 'src/app/core/session-storage/services/temporary-storage.service';


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
  public retailer_id: string;
  
  subscription: Subscription;
  private temporaryStorage: TemporaryStorageFacet;

  constructor(
    private router: Router,
    private buyerNavegationStore: BuyerNavegationStore,
    public retailerStoreStore: RetailerStoreStore,
    private readonly activatedRoute: ActivatedRoute,
  ) { 

    this.initializeViewSettings();
  
  } 

  ngOnInit(): void {

    this.subscription = this.activatedRoute.paramMap.subscribe( params => {
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
      BUYER_CONFIG.navegation.categoryView
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
    this.router.navigate(['/tienda-vendedor', this.retailer_id,'variedad',category],);
  }

  public _filterAllProductsByCategory(products: Product[]): Product[] {
    return filterAllProductsByCategory(products);
  }

}
