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
  getCartProductFromProduct,
  round,
} from 'src/app/core/cart/helpers/cart-helper';
import { CartStore } from 'src/app/core/cart/services/cart.store';
import { CartProduct } from 'src/app/core/cart/types/cart-product';
import { Product } from '../../../core/retailer/types/product';
import { containtToppings } from '../../helpers/cart-product.helpers';
import { AddToppingsComponent } from '../add-toppings/add-toppings.component';
import { ToppingSelected } from '../topping/types/toppingSelected';

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
      name: 'Cortesia de la casa',
      values: ['Queso', 'Jamón', 'Huevo'],
      multipleSelection: false,
    },
    {
      name: 'Tus cremas',
      values: [
        'Ketchup',
        'Mayonesa',
        'Mostaza',
        'Tártara',
        'Aji',
        'Salsa Gold',
      ],
      multipleSelection: true,
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
      data: {
        productName: this.product.maturityName,
        image: this.product.maturityImageUrl,
        toppings: this.toppings,
        currentState: this.toState,
      },
    });

    this.dialogRef.afterClosed().subscribe((result: any) => {
      console.log('RESUT THIS from the modal', result);
      // create a new cart stores with updated quantity

      const cartProduct: CartProduct = getCartProductFromProduct(
        this.product,
        1,
        this.size
      );

      this.emmitModalResults(cartProduct, result);
    });
  }
  emmitModalResults(cartProduct: CartProduct, result: any): void {
    // create idAux (_id + "_" timestamp
    const currentTimeInMilliseconds = Date.now(); // unix timestamp in milliseconds)
    cartProduct.idAux = `${cartProduct._id}_${currentTimeInMilliseconds}`;

    const selectedToppings: ToppingSelected[] = result.toppingsSelected;

    selectedToppings.forEach((topping, id) => {
      let toppingsFormated = topping.selected.split(',');

      cartProduct.details += `${(id + 1).toString()} ] `;
      // cartProduct.details += `✔ `;
      toppingsFormated.forEach((toppingFormated, idx) => {
        const separator = idx < toppingsFormated.length - 1 ? ', ' : '. ';
        cartProduct.details += `${toppingFormated}${separator}`;
      });
      // cartProduct.details += '\n';
    });

    this.quantityStr = cartProduct.quantity.toString();

    cartProduct.maturityName = `${cartProduct.maturityName}  (${result.productLabel})`;

    // then send it to to listener to be updated in
    // this.selectedCartProduct.emit(cartProduct);
    this.selectedCartProductWithToppings.emit(cartProduct);

    // search by _Id and count then incremente
    const quantity = this.cartStore.countCartStoreProductsWithToppingsSameID(
      cartProduct
    );
    this.onQuantityUpdatedWithToppings(quantity);
  }
}
