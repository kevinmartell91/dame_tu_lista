import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetailerStoresRoutingModule } from './retailer-stores-routing.module';
import { RetailerStoresComponent } from './retailer-stores.component';
import { SharedModule } from "../../shared/shared.module";
import { ProductDisplaySharedComponent } from "../../shared/components/product-display/product-display.component";
import { CategoryProductsComponent } from './views/category-products/category-products.component';
import { MaturityProductsComponent } from './views/maturity-products/maturity-products.component';
import { VarietyProductsComponent } from './views/variety-products/variety-products.component';
import { SeasonalProductsComponent } from './componentes/seasonal-products/seasonal-products.component';

@NgModule({
  declarations: [
    RetailerStoresComponent,
    CategoryProductsComponent,
    SeasonalProductsComponent,
    MaturityProductsComponent,
    VarietyProductsComponent,
    ProductDisplaySharedComponent
  ],
  imports: [
    CommonModule,
    RetailerStoresRoutingModule,
    SharedModule
  ]
})
export class RetailerStoresModule { }
