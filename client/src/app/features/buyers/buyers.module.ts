import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyersRoutingModule } from './buyers-routing.module';
import { BuyersComponent } from './buyers.component';
import { BuyerAddComponent } from './components/buyer-add/buyer-add.component';
import { BuyerDeleteComponent } from './components/buyer-delete/buyer-delete.component';
import { BuyerUpdateComponent } from './components/buyer-update/buyer-update.component';
import { BuyerViewComponent } from './components/buyer-view/buyer-view.component';

import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    BuyersComponent,
    BuyerAddComponent,
    BuyerDeleteComponent,
    BuyerUpdateComponent,
    BuyerViewComponent
  ],
  imports: [
    CommonModule,
    BuyersRoutingModule,
    SharedModule
  ]
})
export class BuyersModule { }
