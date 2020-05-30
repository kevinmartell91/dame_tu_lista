import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyerAccountsComponent } from './buyer-accounts.component';

const routes: Routes = [{ path: '', component: BuyerAccountsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerAccountsRoutingModule { }
