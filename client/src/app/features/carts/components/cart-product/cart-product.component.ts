import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { updateTotalProductPrice } from 'src/app/core/cart/helpers/cart-helper';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { containtToppings } from 'src/app/shared/helpers/cart-product.helpers';
import { CartProductDetailModalComponent } from '../cart-product-detail-modal/cart-product-detail-modal.component';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.sass'],
})
export class CartProductComponent implements OnInit {
  @Input() cartProduct: CartProduct;
  @Input() isPlacedOrder: boolean;
  @Output() cartProductUpdated = new EventEmitter<CartProduct>();
  @Output() cartProducDeleted = new EventEmitter<CartProduct>();

  cartProductTotalPriceStr: string;
  cartProductPriceStr: string;
  cartProductQuantityStr: string;

  isQuantityMode: boolean = false;

  dialogRef: any;
  hasToppings: boolean;

  constructor(private matDialog: MatDialog) {
    console.log('CartProductComponent - constructor');
  }

  ngOnInit(): void {
    this.hasToppings = containtToppings(this.cartProduct.categoryName);

    this.cartProductPriceStr = this.cartProduct.price.toFixed(2);
    // this.cartProductQuantityStr = this.cartProduct.isKilo
    //   ? this.cartProduct.quantity.toFixed(2)
    //   : this.cartProduct.quantity.toFixed(0);
    this.transformCartProductTotalPriceToStr();
    console.log('isPlaceOrder', this.isPlacedOrder);
  }

  /**
   * listen to quantityUpdated from add-button-component.ts
   * @param newQuantity
   */
  onQuantityUpdated(quantityUpdated: number) {
    // if cartProduct quatity is 0,
    // then disableQuantityMode
    if (quantityUpdated == 0) {
      // this.disableQuantityMode()
      this.isQuantityMode = false;
    }

    this.cartProduct.quantity = quantityUpdated;
    this.cartProduct.totalPrice = updateTotalProductPrice(
      this.cartProduct.quantity,
      this.cartProduct.price
    );

    // formating to two decimals and as a string
    this.transformCartProductTotalPriceToStr();

    this.cartProductUpdated.emit(this.cartProduct);
  }

  deleteCartProduct(): void {
    this.cartProducDeleted.emit(this.cartProduct);
  }

  enableQuantityMode(): void {
    this.isQuantityMode = true;
  }

  onDisableQuantityMode(disable: boolean): void {
    this.isQuantityMode = disable;
  }

  transformCartProductTotalPriceToStr(): void {
    this.cartProductTotalPriceStr = this.cartProduct.totalPrice.toFixed(2);
    this.cartProductQuantityStr = this.cartProduct.isKilo
      ? this.cartProduct.quantity.toFixed(2)
      : this.cartProduct.quantity.toFixed(0);
  }

  openAddCartProductDetailModal(): void {
    this.dialogRef = this.matDialog.open(CartProductDetailModalComponent, {
      width: '320px',
      data: {
        cartProductDetail: this.cartProduct.details,
      },
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      this.cartProduct.details = result.productCartDetail;
      this.cartProductUpdated.emit(this.cartProduct);
    });
  }

  getNameOfTheProduct(): string {
    return this.cartProduct.categoryName === 'Comida rápida'
      ? this.cartProduct.maturityName
      : `${this.cartProduct.categoryName} - ${this.cartProduct.varietyName}`;
  }
}
