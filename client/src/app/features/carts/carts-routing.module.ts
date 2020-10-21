import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartsComponent } from './carts.component';
import { FillShippingAddressComponent } from "./components/fill-shipping-address/fill-shipping-address.component";
import { ThanksOrderComponent } from "./components/thanks-order/thanks-order.component";


const routes: Routes = [
  { 
    path: '',
    component: CartsComponent,
    children: [
      {
        path: '',
        children: [
         { path: 'completar-direccion', component: FillShippingAddressComponent },
         { path: 'gracias-por-tu-compra', component: ThanksOrderComponent }
        ]
      }
    ] 
  },
];``

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartsRoutingModule { }
