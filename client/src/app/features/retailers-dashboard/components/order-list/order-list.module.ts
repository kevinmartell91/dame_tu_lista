import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderListRoutingModule } from './order-list-routing.module';
import { OrderListComponent } from './order-list.component';
import { OrderDisplayComponent } from "../order-display/order-display.component";
import { SharedModule } from "../../../../shared/shared.module";
import { DisplayDetailModalComponent } from '../display-detail-modal/display-detail-modal.component';



@NgModule({
  declarations: [
    OrderListComponent,
    DisplayDetailModalComponent,
    OrderDisplayComponent,
  ],
  imports: [
    CommonModule,
    OrderListRoutingModule,
    SharedModule
  ]
})
export class OrderListModule { }
