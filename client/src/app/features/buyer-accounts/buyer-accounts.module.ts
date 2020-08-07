import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthenticationStore } from "../../core/login/services/authentication.store";
import { SharedModule } from "../../shared/shared.module";
import { BuyerAccountsRoutingModule } from './buyer-accounts-routing.module';
import { BuyerAccountsComponent } from './buyer-accounts.component';
import { AddRetailerModalComponent } from './components/add-retailer-modal/add-retailer-modal.component';
import { BuyerAccountEndPoint } from "./services/buyer-account.endpoint";
import { BuyerAccountStore } from "./services/buyer-account.store";



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
