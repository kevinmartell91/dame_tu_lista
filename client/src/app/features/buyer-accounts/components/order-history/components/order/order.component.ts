import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/core/order/types/order';
import { CartProductOrder } from 'src/app/core/order/types/cart-product-order';
import { updateBuyerNavagation } from 'src/app/features/retailer-stores/helpers/buyerNavegation.helper';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';

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


  constructor(
    private buyerNavegationStore: BuyerNavegationStore
  ) { }

  ngOnInit(): void {

    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.accountView
    );

    this.cartProductOrderPriceStr = this.cartProductOrder.price.toFixed(2);
    this.transformcartProductOrderTotalPriceToStr();
  }

  

  transformcartProductOrderTotalPriceToStr(): void {
    this.cartProductOrderTotalPriceStr = this.cartProductOrder.totalPrice.toFixed(2);
  }

}
