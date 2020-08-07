import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetailerStoresComponent } from './retailer-stores.component';
import { CategoryProductsComponent } from './views/category-products/category-products.component';
import { MaturityProductsComponent } from './views/maturity-products/maturity-products.component';
import { StoreComponent } from "./views/store/store.component";
import { VarietyProductsComponent } from './views/variety-products/variety-products.component';



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
            path: 'categoria',
            component: CategoryProductsComponent
          },
          {
            path: 'variedad/:categoryName',
            component: VarietyProductsComponent
          },
          {
            path: 'madurez/:categoryName/:varietyName/:isOrganic',
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
