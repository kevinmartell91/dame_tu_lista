import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartsRoutingModule } from './carts-routing.module';
import { CartsComponent } from './carts.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { CartQuantityButtonComponent } from './components/cart-quantity-button/cart-quantity-button.component';

@NgModule({
  declarations: [CartsComponent, CartProductComponent, CartQuantityButtonComponent],
  imports: [
    CommonModule,
    CartsRoutingModule
  ]
})
export class CartsModule { }
