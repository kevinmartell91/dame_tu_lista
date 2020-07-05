import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerAccountsRoutingModule } from './buyer-accounts-routing.module';
import { BuyerAccountsComponent } from './buyer-accounts.component';
import { BuyerAccountEndPoint } from "./services/buyer-account.endpoint";
import { BuyerAccountStore } from "./services/buyer-account.store";
import { BuyerNavegationStore } from 'src/app/core/buyer/services/buyer-navegation.store';
import { AuthenticationStore } from "../../core/login/services/authentication.store";

// import { SharedModule } from "../../shared/shared.module";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {  } from "module";


@NgModule({
  declarations: [BuyerAccountsComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    BuyerAccountsRoutingModule
  ],
  providers: [
    AuthenticationStore,
    BuyerAccountEndPoint,
    BuyerAccountStore
  ]
})
export class BuyerAccountsModule { }
