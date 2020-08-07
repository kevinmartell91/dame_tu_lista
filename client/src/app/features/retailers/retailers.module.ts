import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { RetailerAddComponent } from './components/retailer-add/retailer-add.component';
import { RetailerDeleteComponent } from './components/retailer-delete/retailer-delete.component';
import { RetailerUpdateComponent } from './components/retailer-update/retailer-update.component';
import { RetailerViewComponent } from './components/retailer-view/retailer-view.component';
import { RetailersRoutingModule } from './retailers-routing.module';
import { RetailersComponent } from './retailers.component';



@NgModule({
  declarations: [
    RetailersComponent, 
    RetailerAddComponent, 
    RetailerUpdateComponent, 
    RetailerDeleteComponent, 
    RetailerViewComponent
  ],
  imports: [
    CommonModule,
    RetailersRoutingModule,
    SharedModule
  ]
})
export class RetailersModule { }
