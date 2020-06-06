import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetailerStoresComponent } from './retailer-stores.component';

const routes: Routes = [{ path: '', component: RetailerStoresComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailerStoresRoutingModule { }
