import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FavoriteRetailersRoutingModule } from './favorite-retailers-routing.module';
import { FavoriteRetailersComponent } from './favorite-retailers.component';



@NgModule({
  declarations: [FavoriteRetailersComponent],
  imports: [
    CommonModule,
    SharedModule,
    FavoriteRetailersRoutingModule
  ]
})
export class FavoriteRetailersModule { }
