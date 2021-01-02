import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaleQuotesComponent } from './sale-quotes.component';

const routes: Routes = [{ path: '', component: SaleQuotesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleQuotesRoutingModule { }
