import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BuyerNavegationStore } from "../core/buyer/services/buyer-navegation.store";
import { CartStore } from "../core/cart/services/cart.store";
import { ErrorInterceptors } from "../core/interceptors/error.interceptor";
import { TokenInterceptor } from "../core/interceptors/token.interceptor";
import { OrderEndPoint } from "../core/order/sevices/order.endpoint";
import { OrderStore } from "../core/order/sevices/order.store";
import { TemporaryStorageService } from "../core/session-storage/services/temporary-storage.service";
// to replace following the scalable structure
import { AuthenticationEndPoint } from "./login/services/authentication.endpoint";
import { AuthenticationStore } from "./login/services/authentication.store";
import { RetailerEndPoint } from './retailer/services/retailer.endpoint';
import { RetailerStore } from './retailer/services/retailer.store';



@NgModule({
    declarations: [],
    imports: [],
    providers: [
      AuthenticationStore,
      AuthenticationEndPoint,
      OrderStore,
      OrderEndPoint,
      BuyerNavegationStore,
      TemporaryStorageService,
      CartStore,
      RetailerStore,
      RetailerEndPoint,
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
