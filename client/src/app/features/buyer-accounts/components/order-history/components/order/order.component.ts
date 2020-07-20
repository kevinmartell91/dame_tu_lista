import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/core/order/types/order';
import { CartProductOrder } from 'src/app/core/order/types/cart-product-order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  @Input() order_id: string;
  @Input() cartProductOrder: CartProductOrder 

  cartProductOrderTotalPriceStr: string;
  cartProductOrderPriceStr: string;


  constructor() { }

  ngOnInit(): void {

    this.cartProductOrderPriceStr = this.cartProductOrder.price.toFixed(2);
    this.transformcartProductOrderTotalPriceToStr();
  }

  

  transformcartProductOrderTotalPriceToStr(): void {
    this.cartProductOrderTotalPriceStr = this.cartProductOrder.totalPrice.toFixed(2);
  }

}
