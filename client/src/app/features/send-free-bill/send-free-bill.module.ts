import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendFreeBillRoutingModule } from './send-free-bill-routing.module';
import { SendFreeBillComponent } from './send-free-bill.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SendFreeBillComponent
  ],
  imports: [
    CommonModule,
    SendFreeBillRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SendFreeBillModule { }
