import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BUYER_CONFIG } from 'src/app/core/buyer/buyer.config';
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { CartProductOrder } from 'src/app/core/order/types/cart-product-order';
import { updateBuyerNavagation } from 'src/app/features/retailer-stores/helpers/buyerNavegation.helper';
import { ProductCommentModalComponent } from "../product-comment-modal/product-comment-modal.component";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass']
})
export class OrderComponent implements OnInit {

  dialogRef: any;

  @Input() order_id: string;
  @Input() cartProductOrder: CartProductOrder 

  cartProductOrderTotalPriceStr: string;
  cartProductOrderPriceStr: string;


  constructor(
    private buyerNavegationStore: BuyerNavegationStore,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {

    updateBuyerNavagation(
      this.buyerNavegationStore,
      BUYER_CONFIG.navegation.accountView,
      "navegation.accountView"
    );

    this.cartProductOrderPriceStr = this.cartProductOrder.price.toFixed(2);
    this.transformcartProductOrderTotalPriceToStr();
  }

  

  transformcartProductOrderTotalPriceToStr(): void {
    this.cartProductOrderTotalPriceStr = this.cartProductOrder.totalPrice.toFixed(2);
  }

  openProductCommentModal():void {
    this.dialogRef = this.matDialog.open(ProductCommentModalComponent, {
      width: '420px',
      data: {
        cartProductDetail: this.cartProductOrder.details
      }
    });

  }

}
