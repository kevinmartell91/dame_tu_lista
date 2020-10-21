import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetailersDashboardComponent } from './retailers-dashboard.component';


const routes: Routes = [
  { 
    path: '', component: RetailersDashboardComponent ,
    children : [
      { path: 'cuenta', loadChildren: () => import('./components/profile-settings/profile-settings.module').then(m => m.ProfileSettingsModule) },
      { path: 'ordenes', loadChildren: () => import('./components/order-list/order-list.module').then(m => m.OrderListModule) },
      // { path: 'productos', loadChildren: () => import('./components/product-list/product-list.module').then(m => m.ProductListModule) },
      // { path: 'perfil-cuenta', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailersDashboardRoutingModule { }
