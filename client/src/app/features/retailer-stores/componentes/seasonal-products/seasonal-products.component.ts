import { Component, Input, OnInit } from '@angular/core';
import { updateTotalProductPrice } from 'src/app/core/cart/helpers/cart-helper';
import { CartStore } from 'src/app/core/cart/services/cart.store';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { Product } from 'src/app/core/retailer/types/product';
import { Retailer } from 'src/app/core/retailer/types/retailer';
import { STORE_CONFIG } from 'src/app/core/store/store_config';
import { containtToppings } from 'src/app/shared/helpers/cart-product.helpers';
import { RetailerStoreStore } from '../../services/retailer.store';

@Component({
  selector: 'app-seasonal-products',
  templateUrl: './seasonal-products.component.html',
  styleUrls: ['./seasonal-products.component.sass'],
})
export class SeasonalProductsComponent implements OnInit {
  @Input() storeProducts: Product[];
  public seasonalView: string;
  public question: string;
  public productSelected: Product;

  public retailer: Retailer;
  public productsList: Product[];

  constructor(
    public retailerStoreStore: RetailerStoreStore,
    private cartStore: CartStore
  ) {
    this.retailerStoreStore.retailer$.subscribe((x) => {
      this.retailer = x;
    });
  }

  ngOnInit(): void {
    this.seasonalView = STORE_CONFIG.view_type.seasonalView;
    this.question = STORE_CONFIG.question_view_type.seasonalView;
  }

  /**
   * Listen to childre component(product-displaycomponent)
   * @param product product selected on children
   * component
   */
  public onSelected(product: Product) {
    this.productSelected = product;
  }

  public onSelectedCartProduct(cartProduct: CartProduct) {
    cartProduct.totalPrice = updateTotalProductPrice(
      cartProduct.quantity,
      cartProduct.price
    );
    this.cartStore.updateCart(cartProduct);
  }
}
