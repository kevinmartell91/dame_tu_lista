import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { updateTotalProductPrice } from 'src/app/core/cart/helpers/cart-helper';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { AddToppingsComponent } from 'src/app/shared/components/add-toppings/add-toppings.component';
import { ToppingModalResult } from 'src/app/shared/components/topping/types/toppingSelected';
import { containtToppings } from 'src/app/shared/helpers/cart-product.helpers';
import { calculateTotalPricePerProductWithToppings } from '../../../../core/cart/helpers/cart-helper';
import { getProductFromLocalStorageByProductId } from '../../helpers/cart-products.helpers';
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

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.hasToppings = containtToppings(this.cartProduct.categoryName);

    this.cartProductPriceStr = this.cartProduct.price.toFixed(2);
    // this.cartProductQuantityStr = this.cartProduct.isKilo
    //   ? this.cartProduct.quantity.toFixed(2)
    //   : this.cartProduct.quantity.toFixed(0);
    this.transformCartProductTotalPriceToStr();
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
    if (containtToppings(this.cartProduct.categoryName)) {
      this.openToppingsOptionsModal();
    } else {
      this.isQuantityMode = true;
    }
  }

  onDisableQuantityMode(disable: boolean): void {
    this.isQuantityMode = disable;
  }

  transformCartProductTotalPriceToStr(): void {
    this.cartProductTotalPriceStr = containtToppings(
      this.cartProduct.categoryName
    )
      ? this.cartProduct.totalAmount.toFixed(2)
      : this.cartProduct.totalPrice.toFixed(2);

    this.cartProductQuantityStr = this.cartProduct.isKilo
      ? this.cartProduct.quantity.toFixed(2)
      : this.cartProduct.quantity.toFixed(0);
  }

  openToppingsOptionsModal(): void {
    const productLocalStorage = getProductFromLocalStorageByProductId(
      this.cartProduct._id
    );

    if (productLocalStorage !== null) {
      this.dialogRef = this.matDialog.open(AddToppingsComponent, {
        width: '320px',
        height: '510px',
        data: {
          mode: 'update',
          productPrice: this.cartProduct.price,
          productName: productLocalStorage.maturityName,
          image: this.cartProduct.maturityImageUrl,
          // description: this.cartProduct.details,
          toppings: productLocalStorage.toppings,
          quantity: this.cartProduct.quantity,
          toppingsSelected: this.cartProduct.toppings,
          productLabel: this.cartProduct.maturityName
            .split('(')[1]
            .split(')')[0],
        },
      });

      this.dialogRef.afterClosed().subscribe((result: ToppingModalResult) => {
        if (result) {
          console.log('Modal has been closed ', result);
          // update quantity
          this.cartProduct.quantity = result.quantity;
          // update productLabel
          this.cartProduct.maturityName = `${productLocalStorage.maturityName} (${result.productLabel})`;
          // updateToppings
          this.cartProduct.toppings = result.toppingsSelected;
          // update totalPrice and totalAmount

          const totalPriceUpdated = calculateTotalPricePerProductWithToppings(
            this.cartProduct.quantity,
            this.cartProduct.price,
            this.cartProduct.toppings
          );

          this.cartProduct.totalAmount = totalPriceUpdated;
          this.cartProduct.totalPrice = totalPriceUpdated;

          // formating to two decimals and as a string
          this.transformCartProductTotalPriceToStr();

          this.cartProductUpdated.emit(this.cartProduct);
        }
      });
    }
  }

  openAddCartProductDetailModal(): void {
    this.dialogRef = this.matDialog.open(CartProductDetailModalComponent, {
      width: '320px',
      data: {
        cartProductDetail: this.cartProduct.details,
      },
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.cartProduct.details = result.productCartDetail;
        this.cartProductUpdated.emit(this.cartProduct);
      }
    });
  }

  getNameOfTheProduct(): string {
    return this.cartProduct.categoryName === 'Comida rápida'
      ? this.cartProduct.maturityName
      : `${this.cartProduct.categoryName} - ${this.cartProduct.varietyName}`;
  }
}
