import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendFreeBillRoutingModule } from './send-free-bill-routing.module';
import { SendFreeBillComponent } from './send-free-bill.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectPaymentMethodComponent } from '../carts/components/select-payment-method/select-payment-method.component';
import { MatDialogRef } from '@angular/material/dialog';


@NgModule({
  declarations: [
    SendFreeBillComponent,
    // SelectPaymentMethodComponent
  ],
  imports: [
    CommonModule,
    SendFreeBillRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: [] }
  ]
})
export class SendFreeBillModule { }
