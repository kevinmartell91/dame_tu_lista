import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToppingSelected } from 'src/app/shared/components/topping/types/toppingSelected';
import { containtToppings } from 'src/app/shared/helpers/cart-product.helpers';
import { CartProductOrder } from '../../../../core/order/types/cart-product-order';
import { DisplayDetailModalComponent } from '../display-detail-modal/display-detail-modal.component';

@Component({
  selector: 'app-order-display',
  templateUrl: './order-display.component.html',
  styleUrls: ['./order-display.component.sass'],
})
export class OrderDisplayComponent implements OnInit {
  @Input() isOrderProductPackagedCompleted: boolean;
  @Input() cartProductOrder: CartProductOrder;
  @Input() order_id: string;
  @Output() isProductOrderCompleted = new EventEmitter<any>();

  cartProductOrderTotalPriceStr: string;
  cartProductOrderPriceStr: string;

  isChecked: boolean = false;

  dialogRef: any;

  toppingsSelected: ToppingSelected[];

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {
    if (this.hasToppings)
      this.toppingsSelected = this.cartProductOrder.toppings;

    this.isChecked = this.cartProductOrder.isCheckedDone;
    this.cartProductOrderPriceStr = this.cartProductOrder.price.toFixed(2);
    this.transformcartProductOrderTotalPriceToStr();
  }

  transformcartProductOrderTotalPriceToStr(): void {
    this.cartProductOrderTotalPriceStr =
      this.cartProductOrder.totalPrice.toFixed(2);
  }

  openAddcartProductOrderDetailModal(): void {
    this.dialogRef = this.matDialog.open(DisplayDetailModalComponent, {
      width: '320px',
      data: {
        cartProductOrderDetail: this.cartProductOrder.details,
      },
    });
  }

  isCheckedCompleted(): void {
    console.log('isCheckedCompleted');
    this.isProductOrderCompleted.emit({
      orderCompleted: this.isChecked,
      order_id: this.order_id,
      cartProductOrder_id: this.cartProductOrder._id,
    });
  }

  get hasToppings(): boolean {
    return containtToppings(this.cartProductOrder.categoryName);
  }

  containsMultipleValues(text: string): boolean {
    return text.includes(',');
  }

  splitInMultipleValues(text: string): string[] {
    return text.split(',');
  }

  calculateTotalPricePerProductWithToppings = (
    topping: ToppingSelected
  ): string => {
    let text: string = '';
    topping.selected.split(',').map((toppingName) => {
      text += toppingName;
    });
    return text;
  };
}
