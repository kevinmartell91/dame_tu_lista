import {
  Component,
  OnDestroy,
  OnInit,
  AfterContentInit,
  DoCheck,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { updateTotalProductPrice } from 'src/app/core/cart/helpers/cart-helper';
import { CartStore } from 'src/app/core/cart/services/cart.store';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { containtToppings } from 'src/app/shared/helpers/cart-product.helpers';
import { Product } from '../../../../core/retailer/types/product';
import { STORE_CONFIG } from '../../../../core/store/store_config';
import { updateBuyerNavagation } from '../../helpers/buyerNavegation.helper';
import { filterProductsByMaturity } from '../../helpers/product.helper';
import { RetailerStoreStore } from '../../services/retailer.store';

@Component({
  selector: 'app-maturity-products',
  templateUrl: './maturity-products.component.html',
  styleUrls: ['./maturity-products.component.sass'],
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
  public isOrganic: string;

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
    // window.location.reload();

    this.subscription = this.activatedRoute.paramMap.subscribe((params) => {
      this.retailer_id = params.get('retailer_id');
      this.category = params.get('categoryName');
      this.variety = params.get('varietyName');
      this.isOrganic = params.get('isOrganic');

      setTimeout(() => {
        updateBuyerNavagation(
          this.buyerNavegationStore,
          BUYER_CONFIG.navegation.maturityView,
          this.variety
        );
      }, 10);
    });
  }
  ngDoCheck() {
    // console.log('do check');
  }
  ngAfterContentInit() {
    // console.log('after content init');
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
    //   BUYER_CONFIG.navegation.maturityView,
    //   ""
    // );

    this.maturityView = STORE_CONFIG.view_type.maturityView;
    this.question = STORE_CONFIG.question_view_type.maturityView;
  }

  /**
   * Listening to selected product as CartProduct
   * @param cartProduct instance ready to be added
   * to CartStore
   */
  public onSelected(product: Product) {
    this.productSelected = product;
  }

  public onSelectedCartProduct(cartProduct: CartProduct): void {
    cartProduct.totalPrice = updateTotalProductPrice(
      cartProduct.quantity,
      cartProduct.price
    );

    this.cartStore.updateCart(cartProduct);
  }

  public onSelectedCartProductWithToppings(cartProduct: CartProduct) {
    cartProduct.totalPrice = updateTotalProductPrice(
      cartProduct.quantity,
      cartProduct.price
    );
    this.cartStore.updateCartWithToppings(cartProduct);
  }

  _filterProductsByMaturity(
    category: string,
    variety: string,
    products: Product[]
  ): Product[] {
    // return filterProductsByMaturity(category, variety, this.isOrganic, products);

    this.retailerStoreStore.updateProductsFromSessionStorage();
    // console.log('objectobject', category, variety);
    return filterProductsByMaturity(
      category,
      variety,
      this.isOrganic,
      this.retailerStoreStore.state.productsList.products
    );
  }
}
