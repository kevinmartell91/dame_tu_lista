import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerAccountsRoutingModule } from './buyer-accounts-routing.module';
import { BuyerAccountsComponent } from './buyer-accounts.component';


@NgModule({
  declarations: [BuyerAccountsComponent],
  imports: [
    CommonModule,
    BuyerAccountsRoutingModule
  ]
})
export class BuyerAccountsModule { }
