import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "../../shared/shared.module";

import { MedicalDashboardRoutingModule } from './medical-dashboard-routing.module';
import { MedicalDashboardComponent } from './medical-dashboard.component';


@NgModule({
  declarations: [
    MedicalDashboardComponent
  ],
  imports: [
    CommonModule,
    MedicalDashboardRoutingModule,
    SharedModule
  ]
})
export class MedicalDashboardModule { }
