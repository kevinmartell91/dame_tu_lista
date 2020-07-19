import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteRetailersRoutingModule } from './favorite-retailers-routing.module';
import { FavoriteRetailersComponent } from './favorite-retailers.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [FavoriteRetailersComponent],
  imports: [
    CommonModule,
    SharedModule,
    FavoriteRetailersRoutingModule
  ]
})
export class FavoriteRetailersModule { }
