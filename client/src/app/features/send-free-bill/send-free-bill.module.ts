import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { SendFreeBillRoutingModule } from './send-free-bill-routing.module';
import { SendFreeBillComponent } from './send-free-bill.component';

@NgModule({
  declarations: [SendFreeBillComponent],
  imports: [
    CommonModule,
    SendFreeBillRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [{ provide: MatDialogRef, useValue: [] }],
})
export class SendFreeBillModule {}
