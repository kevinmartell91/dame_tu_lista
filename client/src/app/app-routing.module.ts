import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

import { AuthGuard } from './core/guard/auth.guards';

const routes: Routes = [
  { 
    path: '', 
    // loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
    loadChildren: () => import('./features/homepage/homepage.module').then(m => m.HomepageModule), 
  },
  { 
    path: 'login', 
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
  },
  { 
    path: 'homepage', 
    loadChildren: () => import('./features/homepage/homepage.module').then(m => m.HomepageModule), 
  },
  { 
    path: 'registrate',
    loadChildren: () => import('./features/register/register.module').then(m => m.RegisterModule) },
  // { 
	//   path: 'dashboard-medical-center', 
  //   loadChildren: () => import('./features/medical-dashboard/medical-dashboard.module').then(m => m.MedicalDashboardModule), 
  //   canActivate: [AuthGuard]
  // },
  // { 
  //   path: 'place-order',
  //   loadChildren: () => import('./features/place-order/place-order.module').then(m => m.PlaceOrderModule),
  //   // canActivate: [AuthGuard]
  // },
  { 
    path: 'cuenta-comprador',
    loadChildren: () => import('./features/buyer-accounts/buyer-accounts.module').then(m => m.BuyerAccountsModule),
    canActivate: [AuthGuard]
  },
  { 
    // path: 'tienda-vendedor/:retailer_id',
    path: ':retailer_store_name',
    loadChildren: () => import('./features/retailer-stores/retailer-stores.module').then(m => m.RetailerStoresModule),
    // canActivate: [AuthGuard]
  },
  { 
    // path: 'carrito-personal', 
    path: ':retailer_store_name/carrito-personal', 
    loadChildren: () => import('./features/carts/carts.module').then(m => m.CartsModule),
    // canActivate: [AuthGuard]
  },
  { 
    path: 'vendedor-dashboard', 
    loadChildren: () => import('./features/retailers-dashboard/retailers-dashboard.module').then(m => m.RetailersDashboardModule),
    canActivate: [AuthGuard]
  },
  {
  	path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
