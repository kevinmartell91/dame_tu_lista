import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LOGIN_CONFIG } from 'src/app/core/login/login.config';
import { OrderStore } from 'src/app/core/order/sevices/order.store';
import { Order } from 'src/app/core/order/types/order';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.sass'],
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  ordersHistory: Order[];
  subscription: Subscription;
  paymentAmountStr: string;

  constructor(public orderStore: OrderStore) {
    this.subscription = this.orderStore.orderListByBuyerId$.subscribe((x) => {
      this.ordersHistory = x;
    });
  }

  ngOnInit(): void {
    let loginUserLocalStorage = JSON.parse(
      localStorage.getItem(LOGIN_CONFIG.loginUserStorage)
    );
    let buyer_id = loginUserLocalStorage.entity._id;
    this.orderStore.initOrderByBuyerId(buyer_id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getLastStatus(status: any): string {
    let lastStatus = status[status.length - 1];
    return lastStatus[0];
  }

  openWhatsApp(order: Order): void {
    // let message = "Tu orden ya está en camino.";
    // if( order.orderType == ' pickup'){
    //   message = "Ya pudes recoger tu orden, está Lista. Te esperamos.";
    // }
    // let link =`//api.whatsapp.com/send?phone=${order.shipping.buyer.phoneNumber}&text=${message}`;
    // window.location.href=link;
  }

  getPaymentAmountStr(order: Order): string {
    return order.payment.amount.toFixed(2);
  }

  getOrderGeneratedDate(order: Order): string {
    let date = String(new Date(order.shipping.tracking.orderStatus[0][1]));
    let arrDate = date.split(' ');

    return arrDate[2] + ' - ' + arrDate[1] + ' - ' + arrDate[3];
  }
}
