import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetailerStoresComponent } from './retailer-stores.component';
import { CategoryProductsComponent } from './views/category-products/category-products.component';
import { MaturityProductsComponent } from './views/maturity-products/maturity-products.component';
import { VarietyProductsComponent } from './views/variety-products/variety-products.component';
import { StoreComponent } from "./views/store/store.component";


const routes: Routes = [
  { 
    path: '', 
    component: RetailerStoresComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: "",
            component: StoreComponent  
          },
          {
            path: 'category-view',
            component: CategoryProductsComponent
          },
          {
            path: 'variety-view',
            component: VarietyProductsComponent
          },
          {
            path: 'maturity-view',
            component: MaturityProductsComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailerStoresRoutingModule { }
