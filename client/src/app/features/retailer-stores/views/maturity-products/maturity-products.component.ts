import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { STORE_CONFIG } from "../../../../core/store/store_config";
import { Product } from "../../../../core/retailer/types/product";
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { updateBuyerNavagation } from '../../helpers/buyerNavegation.helper';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { RetailerStoreStore } from '../../services/retailer.store';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import {filterProductsByMaturity, getProductDeserialized} from '../../helpers/product.helper';
import { Subscription } from 'rxjs';
import { 
  TemporaryStorageFacet, 
  TemporaryStorageService 
} from 'src/app/core/session-storage/services/temporary-storage.service';
import { ActivatedRoute } from '@angular/router';
import { CartStore } from 'src/app/core/cart/services/cart.store';
import { CartProduct } from 'src/app/core/cart/types/cart-product';

@Component({
  selector: 'app-maturity-products',
  templateUrl: './maturity-products.component.html',
  styleUrls: ['./maturity-products.component.sass']
})
export class MaturityProductsComponent implements OnInit, OnDestroy {

  public maturityView: string;
  public question: string;

  public retailer: Retailer;
  public productsList: Product[];
  public cartProductSelected: CartProduct;
  public productSelected: Product;
  public categoryProduct: string;
  public varietyProduct: string;

  // url params attributes
  public category: string;
  public variety: string;
  public retailer_id: string;

  public subscription: Subscription;

  constructor( 
    private buyerNavegationStore: BuyerNavegationStore,
    private readonly activatedRoute: ActivatedRoute,
    public retailerStoreStore: RetailerStoreStore,
    private cartStore: CartStore
  ) {

    this.initializeViewSettings();
    
   }
    
  ngOnInit(): void {

    this.subscription = this.activatedRoute.paramMap.subscribe( params => {
      this.retailer_id = params.get('retailer_id');
      this.category = params.get('categoryName');
      this.variety = params.get('varietyName');
    })

  }

  /**
   *  By unsubscribing, It prevents memory leak
   */
  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  private initializeViewSettings(): void {

    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.maturityView
    );
    
    this.maturityView = STORE_CONFIG.view_type.maturityView;
    this.question = STORE_CONFIG.question_view_type.maturityView;

  }

  /**
   * Listening to selected product as CartProduct
   * @param cartProduct instance ready to be added
   * to CartStore
   */
  public onSelected(product: Product) {

    this.productSelected =  product;
    console.log("onSelected");
  }
  
  public onSelectedCartProduct( cartProduct: CartProduct): void {
  
    this.cartStore.updateCart(cartProduct);
  
  }
  
  _filterProductsByMaturity(
    category: string, 
    variety: string, 
    products: Product[]
  ): Product[] {
    
    return filterProductsByMaturity(category, variety, products);

  }
  
}
