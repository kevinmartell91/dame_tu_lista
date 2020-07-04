import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartsComponent } from './carts.component';
import { FillShippingAddressComponent } from "./components/fill-shipping-address/fill-shipping-address.component";

const routes: Routes = [
  { path: '', component: CartsComponent },
  { path: 'completar-direccion', component: FillShippingAddressComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartsRoutingModule { }
