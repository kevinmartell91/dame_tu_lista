import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetailerStoresRoutingModule } from './retailer-stores-routing.module';
import { RetailerStoresComponent } from './retailer-stores.component';
import { SharedModule } from "../../shared/shared.module";
import { CategoryProductsComponent } from './views/category-products/category-products.component';
import { MaturityProductsComponent } from './views/maturity-products/maturity-products.component';
import { VarietyProductsComponent } from './views/variety-products/variety-products.component';
import { SeasonalProductsComponent } from './componentes/seasonal-products/seasonal-products.component';
import { StoreComponent } from './views/store/store.component';
import { RetailerEndpoint } from "./services/retailer.endpoint";
import { RetailerStoreStore } from "./services/retailer.store";

@NgModule({
  declarations: [
    RetailerStoresComponent,
    CategoryProductsComponent,
    SeasonalProductsComponent,
    MaturityProductsComponent,
    VarietyProductsComponent,
    StoreComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RetailerStoresRoutingModule
  ],
  providers: [
    RetailerEndpoint,
    RetailerStoreStore
  ]
})
export class RetailerStoresModule { }
