import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendFreeBillComponent } from './send-free-bill.component';

const routes: Routes = [{ path: '', component: SendFreeBillComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendFreeBillRoutingModule {}
