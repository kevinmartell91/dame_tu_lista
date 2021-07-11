import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SaleQuotesRoutingModule } from './sale-quotes-routing.module';
import { SaleQuotesComponent } from './sale-quotes.component';

@NgModule({
  declarations: [SaleQuotesComponent],
  imports: [CommonModule, SharedModule, SaleQuotesRoutingModule],
})
export class SaleQuotesModule {}
