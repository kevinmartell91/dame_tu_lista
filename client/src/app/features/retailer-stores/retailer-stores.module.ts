import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetailerStoresRoutingModule } from './retailer-stores-routing.module';
import { RetailerStoresComponent } from './retailer-stores.component';
// import { SharedModule } from "../../shared/shared.module";
import { ProductDisplaySharedComponent } from "../../shared/components/product-display/product-display.component";

@NgModule({
  declarations: [
    RetailerStoresComponent,
    ProductDisplaySharedComponent
  ],
  imports: [
    CommonModule,
    RetailerStoresRoutingModule,
    // SharedModule
  ]
})
export class RetailerStoresModule { }
