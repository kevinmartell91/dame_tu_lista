import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  calculateTotalPricePerProductWithToppings,
  getCartProductFromProduct,
  getCartProductWithToppingsFromProductWithToppings,
  round,
} from 'src/app/core/cart/helpers/cart-helper';
import { CartStore } from 'src/app/core/cart/services/cart.store';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { Product } from '../../../core/retailer/types/product';
import { containtToppings } from '../../helpers/cart-product.helpers';
import { AddToppingsComponent } from '../add-toppings/add-toppings.component';
import {
  ToppingModalResult,
  ToppingSelected,
} from '../topping/types/toppingSelected';

@Component({
  selector: 'app-product-display-shared',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.sass'],
})
export class ProductDisplaySharedComponent implements OnInit, OnDestroy {
  // getting the list of product and render depending on the typeView
  @Input() typeView: string;
  @Input() product: Product;

  @Output() selected = new EventEmitter<Product>();
  @Output() selectedCartProduct = new EventEmitter<CartProduct>();
  @Output() selectedCartProductWithToppings = new EventEmitter<CartProduct>();
  @Output() quantityUpdated = new EventEmitter<number>();

  isQuantityMode: boolean = false;
  isKiloUnitAvailable: boolean = true;
  isSizeAvailable: boolean = true;

  quantityStr: string = '+';
  quantity: number = 0;
  kiloOrUnit: string = '';
  size: string = '';
  productPriceStr: string;
  productTotalPriceQuantityStr: string;

  isQuantityIncreased: boolean;

  toState = 'out';
  dialogRef: any;
  hasToppings: boolean;

  constructor(private MatDialog: MatDialog, private cartStore: CartStore) {}

  ngOnInit(): void {
    this.hasToppings = containtToppings(this.product.categoryName);

    if (this.product.quantity) {
      // // setting this quantity to pass the add button in side the modal
      this.quantity = this.product.quantity;
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
      this.productTotalPriceQuantityStr = containtToppings(
        this.product.categoryName
      )
        ? `S/. ${this.cartStore.calculateCartStoreTotalPriceCartProductWithToppingById(
            this.product._id
          )}`
        : `S/. ${round(this.product.price * this.product.quantity, 2).toFixed(
            2
          )}`;
    }
  }
  ngOnDestroy() {}

  isKilo(): boolean {
    return this.product.isKilo;
  }

  select() {
    this.selected.emit(this.product);
  }

  getGridView(): string {
    switch (this.typeView) {
      case 'maturityView':
        return 'product_display_grid_maturity_view';
      case 'categoryView':
        return 'product_display_grid_category_view';
      case 'varietyView':
        return 'product_display_grid_variety_view';
      case 'rowView':
        return 'product_display_grid_row_view';
      default:
        // "SeasonView"
        return 'product_display_grid_seasonal_view';
    }
  }

  /**
   * listen to quantityUpdated from add-button-component.ts
   * @param newQuantity
   */
  async onQuantityUpdated(quantityUpdated: number) {
    console.log('quantityUpdated on product display', quantityUpdated);
    // if cartProduct quatity is 0,
    // then disableQuantityMode
    if (quantityUpdated == 0) {
      // this.disableQuantityMode();
      this.isQuantityMode = false;
    }

    if (quantityUpdated == 0) {
      this.quantityStr = '+';
      this.productTotalPriceQuantityStr = '';
      this.isQuantityIncreased = false;
    } else {
      this.quantity = quantityUpdated;
      this.quantityStr = quantityUpdated.toString();
      this.productTotalPriceQuantityStr = `S/.
       ${round(this.product.price * quantityUpdated, 2).toFixed(2)}`;

      this.isQuantityIncreased = true;
    }

    // create a new cart stores with updated quantity
    const cartProduct: CartProduct = getCartProductFromProduct(
      this.product,
      quantityUpdated,
      this.size
    );
    // then send it to to listener to be updated in
    this.selectedCartProduct.emit(cartProduct);
  }

  onQuantityUpdatedWithToppings(quantityUpdated: number) {
    console.log('onQuantityUpdatedWithToppings', quantityUpdated);
    // if cartProduct quatity is 0,
    // then disableQuantityMode
    if (quantityUpdated == 0) {
      // this.disableQuantityMode();
      this.isQuantityMode = false;
    }

    if (quantityUpdated == 0) {
      this.quantityStr = '+';
      this.productTotalPriceQuantityStr = '';
      this.isQuantityIncreased = false;
    } else {
      this.quantity = quantityUpdated;
      this.quantityStr = quantityUpdated.toString();
      this.productTotalPriceQuantityStr = `S/. ${this.cartStore.calculateCartStoreTotalPriceCartProductWithToppingById(
        this.product._id
      )}`;

      // this.productTotalPriceQuantityStr = `S/.
      //  ${round(this.product.price * quantityUpdated, 2).toFixed(2)}`;

      this.isQuantityIncreased = true;
    }

    // create a new cart stores with updated quantity
    // const cartProduct: CartProduct = getCartProductFromProduct(
    //   this.product,
    //   quantityUpdated,
    //   this.size
    // );
    // then send it to to listener to be updated in
    // this.selectedCartProduct.emit(cartProduct);
    // return cartProduct;
  }

  onMassUpdated(kiloOrUnitUpdated: string) {
    this.kiloOrUnit = kiloOrUnitUpdated;
  }

  onSizeUpdated(sizeUpdated: string) {
    // this.switchQuantityMode();
    this.size = sizeUpdated;
  }

  enableQuantityMode(): void {
    if (this.hasToppings) {
      this.openToppingsOption();
      this.showToppings();
      return;
    }
    this.isQuantityMode = true;
  }

  onDisableQuantityMode(disable: boolean): void {
    // console.log("this.isQuantityMode = disable;", disable);
    this.isQuantityMode = disable;
    // this.hideToppings();
  }

  switchQuantityMode(): void {
    this.isQuantityMode = !this.isQuantityMode;
  }

  // private getCartProduct(): CartProduct {

  //   return getCartProductFromProduct(this.product, this.quantity, this.size);

  // }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  toppings: any = [
    {
      name: 'Tipo de papas',
      values: ['Papas al hilo', 'Papas fritas'],
      multipleSelection: false,
    },
    {
      type_toppings: 'panes',
      price_toppings: [0, 0],
      isEnable_toppings: true,
      title_toppings: 'tipo de pan',
      name_toppings: ['Pan de Yema', 'Pan Frances'],
      isMultipleSelection_toppings: false,
      _id: '6077870cb877c132ec9eac92',
    },
  ];

  showToppings() {
    this.toState = 'in';
  }

  hideToppings() {
    this.toState = 'out';
  }

  openToppingsOption(): void {
    this.dialogRef = this.MatDialog.open(AddToppingsComponent, {
      width: '320px',
      height: '500px',
      data: {
        productPrice: this.product.price,
        productName: this.product.maturityName,
        image: this.product.maturityImageUrl,
        toppings: this.product.toppings,
        currentState: this.toState,
        quantity: 1,
      },
    });

    this.dialogRef.afterClosed().subscribe((result: ToppingModalResult) => {
      if (result) {
        // create a new cart stores with updated quantity
        const cartProduct: CartProduct = getCartProductWithToppingsFromProductWithToppings(
          this.product,
          this.size,
          result
        );

        // this.emmitModalResults(cartProduct, result);
        // this.quantityStr = cartProduct.quantity.toString();

        // console.log('cartProduct UPDATED', cartProduct);
        this.selectedCartProductWithToppings.emit(cartProduct);

        // // search by _Id and count then increment
        const quantity = this.cartStore.countCartStoreProductsWithToppingsSameID(
          cartProduct
        );
        this.onQuantityUpdatedWithToppings(quantity);
      }
    });
  }
  emmitModalResults(cartProduct: CartProduct, result: any): void {
    // // create idAux (_id + "_" timestamp
    // const currentTimeInMilliseconds = Date.now(); // unix timestamp in milliseconds)
    // cartProduct.idAux = `${cartProduct._id}_${currentTimeInMilliseconds}`;
    // if (result) {
    //   const selectedToppings: ToppingSelected[] = result.toppingsSelected;
    //   cartProduct.toppings = selectedToppings;
    // }
    // this.quantityStr = cartProduct.quantity.toString();
    // formating to two decimals and as a string
    // cartProduct.quantity = result.quantity;
    // cartProduct.maturityName = `${cartProduct.maturityName}  (${result.productLabel})`;
    // const totalPrice = calculateTotalPricePerProductWithToppings(cartProduct);
    // cartProduct.totalPrice = totalPrice;
    // this.productTotalPriceQuantityStr = '(cartProduct.totalPrice).toFixed(2);';
    // then send it to to listener to be updated in
    // this.selectedCartProduct.emit(cartProduct);
    // console.log('cartProduct UPDATED', cartProduct);
    // this.selectedCartProductWithToppings.emit(cartProduct);
    // // search by _Id and count then incremente
    // const quantity = this.cartStore.countCartStoreProductsWithToppingsSameID(
    //   cartProduct
    // );
    // this.onQuantityUpdatedWithToppings(quantity);
  }
}
