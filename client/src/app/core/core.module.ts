import { NgModule, Optional, SkipSelf } from '@angular/core';

import { HTTP_INTERCEPTORS } from "@angular/common/http";

// to replace following the scalable structure
import { AuthenticationEndPoint } from "./login/services/authentication.endpoint";
import { AuthenticationStore } from "./login/services/authentication.store";

import { ErrorInterceptors } from "../core/interceptors/error.interceptor";
import { TokenInterceptor } from "../core/interceptors/token.interceptor";

import { BuyerNavegationStore } from "../core/buyer/services/buyer-navegation.store";

@NgModule({
    declarations: [],
    imports: [],
    providers: [
      AuthenticationStore,
      AuthenticationEndPoint,
      BuyerNavegationStore,
      { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptors, multi: true }
    ],
})

export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error (
                'CoreModule is already loaded. Import it is AppModule only.'
            )
        }
    }
}
