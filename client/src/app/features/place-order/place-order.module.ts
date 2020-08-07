import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SharedModule } from 'src/app/shared/shared.module';
import { DisplayDetailComponent } from './components/display-detail/display-detail.component';
import { InputProductLastForComponent } from './components/input-product-last-for/input-product-last-for.component';
import { InputProductNameComponent } from './components/input-product-name/input-product-name.component';
import { InputProductQuantityComponent } from './components/input-product-quantity/input-product-quantity.component';
import { InputProductSizeComponent } from './components/input-product-size/input-product-size.component';
import { InputProductWeightComponent } from './components/input-product-weight/input-product-weight.component';
import { ProductContainerComponent } from './components/product-container/product-container.component';
import { ProductDisplayComponent } from './components/product-display/product-display.component';
import { PlaceOrderRoutingModule } from './place-order-routing.module';
import { PlaceOrderComponent } from './place-order.component';


@NgModule({
  declarations: [
    PlaceOrderComponent,
    InputProductNameComponent,
    InputProductWeightComponent,
    InputProductQuantityComponent,
    InputProductSizeComponent,
    InputProductLastForComponent,
    ProductContainerComponent,
    ProductDisplayComponent,
    DisplayDetailComponent
  ],
  entryComponents:[
    InputProductSizeComponent
  ],
  imports: [
    PlaceOrderRoutingModule,
    SharedModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: [] }, 
    { provide: MAT_DIALOG_DATA, useValue: [] }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class PlaceOrderModule { }

// https://tburleson-layouts-demos.firebaseapp.com/#/docs
// https://www.callto.shop/