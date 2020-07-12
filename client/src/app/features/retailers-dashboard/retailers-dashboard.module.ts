import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetailersDashboardRoutingModule } from './retailers-dashboard-routing.module';
import { RetailersDashboardComponent } from './retailers-dashboard.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    RetailersDashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RetailersDashboardRoutingModule
  ]
})
export class RetailersDashboardModule { }
