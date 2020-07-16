import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerAccountsRoutingModule } from './buyer-accounts-routing.module';
import { BuyerAccountsComponent } from './buyer-accounts.component';
import { BuyerAccountEndPoint } from "./services/buyer-account.endpoint";
import { BuyerAccountStore } from "./services/buyer-account.store";
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { AuthenticationStore } from "../../core/login/services/authentication.store";

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddRetailerModalComponent } from './components/add-retailer-modal/add-retailer-modal.component';
import { SharedModule } from "../../shared/shared.module";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    BuyerAccountsComponent,
    AddRetailerModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BuyerAccountsRoutingModule
  ],
  providers: [
    AuthenticationStore,
    BuyerAccountEndPoint,
    BuyerAccountStore
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class BuyerAccountsModule { }
