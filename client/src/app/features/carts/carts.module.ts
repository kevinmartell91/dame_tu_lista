import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { SharedModule } from "../../shared/shared.module";
import { CartsRoutingModule } from './carts-routing.module';
import { CartsComponent } from './carts.component';
import { CartProductDetailModalComponent } from './components/cart-product-detail-modal/cart-product-detail-modal.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { CartQuantityButtonComponent } from './components/cart-quantity-button/cart-quantity-button.component';
import { FillShippingAddressComponent } from './components/fill-shipping-address/fill-shipping-address.component';
import { SelectPaymentMethodComponent } from './components/select-payment-method/select-payment-method.component';
import { ThanksOrderComponent } from './components/thanks-order/thanks-order.component';



@NgModule({
  declarations: [
    CartsComponent, 
    CartProductComponent, 
    CartQuantityButtonComponent, 
    FillShippingAddressComponent, 
    SelectPaymentMethodComponent,
    ThanksOrderComponent,
    CartProductDetailModalComponent 
  ],
  imports: [
    CommonModule,
    CartsRoutingModule,
    SharedModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: [] }
    // { provide: MAT_DIALOG_DATA, useValue: [] }
  ]
})
export class CartsModule { }
