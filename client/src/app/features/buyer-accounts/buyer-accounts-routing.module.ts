import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerAccountsComponent } from './buyer-accounts.component';

const routes: Routes = [
  {
    path: '',
    component: BuyerAccountsComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import(
            './components/favorite-retailers/favorite-retailers.module'
          ).then((m) => m.FavoriteRetailersModule),
      },
      {
        path: 'historial-ordenes',
        loadChildren: () =>
          import('./components/order-history/order-history.module').then(
            (m) => m.OrderHistoryModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyerAccountsRoutingModule {}
