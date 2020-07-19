import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { CartProductOrder } from '../../../../core/order/types/cart-product-order';
import { updateTotalProductPrice } from 'src/app/core/cart/helpers/cart-helper';
import { MatDialog } from '@angular/material/dialog';
import { DisplayDetailModalComponent } from "../display-detail-modal/display-detail-modal.component";


@Component({
  selector: 'app-order-display',
  templateUrl: './order-display.component.html',
  styleUrls: ['./order-display.component.sass']
})
export class OrderDisplayComponent implements OnInit {


  @Input() cartProductOrder: CartProductOrder;
  @Input() order_id: string;
  @Output() isProductOrderCompleted = new EventEmitter<any>();


  cartProductOrderTotalPriceStr: string;
  cartProductOrderPriceStr: string;


  isChecked: boolean = false;

  dialogRef: any;

  constructor(
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.isChecked = this.cartProductOrder.isCheckedDone;
    this.cartProductOrderPriceStr = this.cartProductOrder.price.toFixed(2);
    this.transformcartProductOrderTotalPriceToStr();
  }

  

  transformcartProductOrderTotalPriceToStr(): void {
    this.cartProductOrderTotalPriceStr = this.cartProductOrder.totalPrice.toFixed(2);
  }

  openAddcartProductOrderDetailModal(): void {
    this.dialogRef = this.matDialog.open(DisplayDetailModalComponent, {
      width: '320px',
      data: {
        cartProductOrderDetail: this.cartProductOrder.details
      }
    });

  }


  isCheckedCompleted(): void {
    // this.isChecked = !this.isChecked;
    console.log("this.isChecked", this.cartProductOrder.categoryName, this.isChecked);
    this.isProductOrderCompleted.emit({
      orderCompleted: this.isChecked,
      order_id: this.order_id,
      cartProductOrder_id: this.cartProductOrder._id
    });
  }

}
