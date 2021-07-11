import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderComponent } from './components/order/order.component';
import { ProductCommentModalComponent } from './components/product-comment-modal/product-comment-modal.component';
import { OrderHistoryRoutingModule } from './order-history-routing.module';
import { OrderHistoryComponent } from './order-history.component';

@NgModule({
  declarations: [
    OrderHistoryComponent,
    OrderComponent,
    ProductCommentModalComponent,
  ],
  imports: [CommonModule, SharedModule, OrderHistoryRoutingModule],
})
export class OrderHistoryModule {}
