import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { DisplayDetailModalComponent } from '../display-detail-modal/display-detail-modal.component';
import { OrderDetailModalComponent } from '../order-detail-modal/order-detail-modal.component';
import { OrderDisplayComponent } from '../order-display/order-display.component';
import { OrderPaymentModalComponent } from '../order-payment-modal/order-payment-modal.component';
import { OrderListRoutingModule } from './order-list-routing.module';
import { OrderListComponent } from './order-list.component';

@NgModule({
  declarations: [
    OrderListComponent,
    DisplayDetailModalComponent,
    OrderDisplayComponent,
    OrderDetailModalComponent,
    OrderPaymentModalComponent,
  ],
  imports: [CommonModule, SharedModule, OrderListRoutingModule],
})
export class OrderListModule {}
