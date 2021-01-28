import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getCartProductFromProduct, round } from 'src/app/core/cart/helpers/cart-helper';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { Product } from '../../../core/retailer/types/product';

@Component({
  selector: 'app-product-display-shared',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.sass']
})
export class ProductDisplaySharedComponent implements OnInit {

  // getting the list of product and render depending on the typeView
  @Input() typeView: string;
  @Input() product: Product;

  @Output() selected = new EventEmitter<Product>();
  @Output() selectedCartProduct = new EventEmitter<CartProduct>();


  isQuantityMode: boolean = false;
  isKiloUnitAvailable: boolean = true;
  isSizeAvailable: boolean = true;

  quantityStr: string = "+";
  quantity: number = 0;
  kiloOrUnit: string = "";
  size: string = "";
  productPriceStr: string;
  productTotalPriceQuantityStr: string;

  isQuantityIncreased: boolean;

  constructor() {


  }

  ngOnInit(): void {
    if (this.product.quantity) {

      this.quantityStr = this.product.quantity.toString();

      if (this.product.quantity > 0) {
        this.isQuantityIncreased = true;
      } else {
        this.isQuantityIncreased = false;
      }
    }
    // formating to two decimals and as a string
    this.productPriceStr = round(this.product.price, 2).toFixed(2);

    if (this.product.quantity > 0) {
      this.productTotalPriceQuantityStr = `S/.
       ${round(this.product.price * this.product.quantity, 2).toFixed(2)}`;

    }

  }

  isKilo(): boolean {
    return this.product.isKilo;
  }

  select() {

    this.selected.emit(this.product)

  }


  getGridView(): string {

    switch (this.typeView) {
      case "maturityView":
        return "product_display_grid_maturity_view";
      case "categoryView":
        return "product_display_grid_category_view";
      case "varietyView":
        return "product_display_grid_variety_view";
      case "rowView":
        return "product_display_grid_row_view";
      default: // "SeasonView"
        return "product_display_grid_seasonal_view";
    }

  }

  /**
   * listen to quantityUpdated from add-button-component.ts
   * @param newQuantity 
   */
  async onQuantityUpdated(quantityUpdated: number) {

    // if cartProduct quatity is 0, 
    // then disableQuantityMode
    if (quantityUpdated == 0) {
      // this.disableQuantityMode();
      this.isQuantityMode = false;
    }

    if (quantityUpdated == 0) {
      this.quantityStr = "+";
      this.productTotalPriceQuantityStr = "";
      this.isQuantityIncreased = false;
    } else {
      this.quantity = quantityUpdated;
      this.quantityStr = quantityUpdated.toString();
      this.productTotalPriceQuantityStr = `S/.
       ${round(this.product.price * quantityUpdated, 2).toFixed(2)}`;

      this.isQuantityIncreased = true;
    }

    // create a new cart stores with updated quantity
    const cartProduct: CartProduct = getCartProductFromProduct(this.product, quantityUpdated, this.size);
    // then send it to to listener to be updated in
    this.selectedCartProduct.emit(cartProduct);

  }

  onMassUpdated(kiloOrUnitUpdated: string) {

    this.kiloOrUnit = kiloOrUnitUpdated;

  }

  onSizeUpdated(sizeUpdated: string) {

    // this.switchQuantityMode();
    this.size = sizeUpdated;

  }

  enableQuantityMode(): void {

    this.isQuantityMode = true;

  }

  onDisableQuantityMode(disable: boolean): void {

    this.isQuantityMode = disable;

  }

  switchQuantityMode(): void {

    this.isQuantityMode ? this.isQuantityMode = false : this.isQuantityMode = true;

  }

  // private getCartProduct(): CartProduct {

  //   return getCartProductFromProduct(this.product, this.quantity, this.size);

  // }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
