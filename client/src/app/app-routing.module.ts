import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AuthGuard } from './core/guard/auth.guards';

const routes: Routes = [
  {
    path: '',
    // loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
    loadChildren: () =>
      import('./features/homepage/homepage.module').then(
        (m) => m.HomepageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'homepage',
    loadChildren: () =>
      import('./features/homepage/homepage.module').then(
        (m) => m.HomepageModule
      ),
  },
  {
    path: 'registrate',
    loadChildren: () =>
      import('./features/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'cuenta-comprador',
    loadChildren: () =>
      import('./features/buyer-accounts/buyer-accounts.module').then(
        (m) => m.BuyerAccountsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'envia-boleta-gratis',
    loadChildren: () =>
      import('./features/send-free-bill/send-free-bill.module').then(
        (m) => m.SendFreeBillModule
      ),
  },
  {
    path: ':retailer_store_name',
    loadChildren: () =>
      import('./features/retailer-stores/retailer-stores.module').then(
        (m) => m.RetailerStoresModule
      ),
    // canActivate: [AuthGuard]
  },
  {
    path: ':retailer_store_name/carrito-personal',
    loadChildren: () =>
      import('./features/carts/carts.module').then((m) => m.CartsModule),
    // canActivate: [AuthGuard]
  },
  {
    path: ':retailer_store_name/cotizacion/:order_id',
    loadChildren: () =>
      import('./features/carts/carts.module').then((m) => m.CartsModule),
    // loadChildren: () => import('./features/sale-quotes/sale-quotes.module').then(m => m.SaleQuotesModule)
  },
  {
    path: ':retailer_store_name/orders/:order_id',
    loadChildren: () =>
      import('./features/carts/carts.module').then((m) => m.CartsModule),
  },
  {
    path: 'vendedor-dashboard',
    loadChildren: () =>
      import('./features/retailers-dashboard/retailers-dashboard.module').then(
        (m) => m.RetailersDashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
//ng g module send-free-bill --route send-free-bill --module ../app-routing.module
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
