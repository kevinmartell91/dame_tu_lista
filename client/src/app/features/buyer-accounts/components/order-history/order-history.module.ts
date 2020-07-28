import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderHistoryRoutingModule } from './order-history-routing.module';
import { OrderHistoryComponent } from './order-history.component';
import { OrderComponent } from './components/order/order.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductCommentModalComponent } from './components/product-comment-modal/product-comment-modal.component';



@NgModule({
  declarations: [
    OrderHistoryComponent,
    OrderComponent,
    ProductCommentModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrderHistoryRoutingModule
  ]
})
export class OrderHistoryModule { }
