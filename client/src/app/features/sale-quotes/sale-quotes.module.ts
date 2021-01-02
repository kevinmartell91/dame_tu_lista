import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleQuotesRoutingModule } from './sale-quotes-routing.module';
import { SaleQuotesComponent } from './sale-quotes.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SaleQuotesComponent],
  imports: [
    CommonModule,
    SharedModule,
    SaleQuotesRoutingModule
  ]
})
export class SaleQuotesModule { }
