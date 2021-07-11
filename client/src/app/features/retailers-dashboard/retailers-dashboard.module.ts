import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RetailersDashboardRoutingModule } from './retailers-dashboard-routing.module';
import { RetailersDashboardComponent } from './retailers-dashboard.component';

@NgModule({
  declarations: [RetailersDashboardComponent],
  imports: [CommonModule, SharedModule, RetailersDashboardRoutingModule],
})
export class RetailersDashboardModule {}
