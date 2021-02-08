import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { EditableComponent } from './editable.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewModeDirective, EditModeDirective, EditableOnEnterDirective } from './product-edit-in-place';
import { RetailerStoreStore } from 'src/app/features/retailer-stores/services/retailer.store';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ViewModeDirective,
    EditModeDirective,
    EditableOnEnterDirective,
    EditableComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductListRoutingModule,
    SharedModule,
  ],
  providers: [
    RetailerStoreStore
  ]
})
export class ProductListModule { }
