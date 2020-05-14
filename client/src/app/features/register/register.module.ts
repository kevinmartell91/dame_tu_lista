import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { BuyerAddComponent } from "../buyers/components/buyer-add/buyer-add.component";
import { RetailerAddComponent } from "../retailers/components/retailer-add/retailer-add.component";

@NgModule({
  declarations: [
    RegisterComponent,
    // BuyerAddComponent,
    // RetailerAddComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
  
  ],
  exports: [
    

  ]
})
export class RegisterModule { }
