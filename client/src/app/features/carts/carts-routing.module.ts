import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartsComponent } from './carts.component';
import { FillShippingAddressComponent } from "./components/fill-shipping-address/fill-shipping-address.component";
import { ThanksOrderComponent } from "./components/thanks-order/thanks-order.component";

const routes: Routes = [
  { path: '', component: CartsComponent },
  { path: 'completar-direccion', component: FillShippingAddressComponent },
  { path: 'gracias-por-tu-compra', component: ThanksOrderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartsRoutingModule { }
