import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetailersDashboardComponent } from './retailers-dashboard.component';

const routes: Routes = [
  { 
    path: '', component: RetailersDashboardComponent ,
    children : [
      { path: '', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'ordenes', loadChildren: () => import('./components/order-list/order-list.module').then(m => m.OrderListModule) },
      { path: 'productos', loadChildren: () => import('./components/product-list/product-list.module').then(m => m.ProductListModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailersDashboardRoutingModule { }
