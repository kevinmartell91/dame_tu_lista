import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { SharedModule } from "../../shared/shared.module";
import { RegisterRetailerComponent } from './components/register-retailer/register-retailer.component';
import { RegisterBuyerComponent } from './components/register-buyer/register-buyer.component';

@NgModule({
  declarations: [
    RegisterComponent,
    RegisterRetailerComponent,
    RegisterBuyerComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule
  
  ],
  exports: [
    

  ]
})
export class RegisterModule { }
