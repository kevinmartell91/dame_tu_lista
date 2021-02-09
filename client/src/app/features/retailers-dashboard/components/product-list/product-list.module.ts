import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RetailerStoreStore } from 'src/app/features/retailer-stores/services/retailer.store';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductListRoutingModule,
    SharedModule
  ],
  providers: [
    RetailerStoreStore
  ]
})
export class ProductListModule { }
