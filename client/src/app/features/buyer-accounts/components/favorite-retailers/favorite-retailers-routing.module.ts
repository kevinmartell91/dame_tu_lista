import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteRetailersComponent } from './favorite-retailers.component';

const routes: Routes = [{ path: '', component: FavoriteRetailersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoriteRetailersRoutingModule { }
