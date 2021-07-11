import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RegisterBuyerComponent } from './components/register-buyer/register-buyer.component';
import { RegisterRetailerComponent } from './components/register-retailer/register-retailer.component';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [
    RegisterComponent,
    RegisterRetailerComponent,
    RegisterBuyerComponent,
  ],
  imports: [CommonModule, RegisterRoutingModule, SharedModule],
  exports: [],
})
export class RegisterModule {}
