import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetailerAddComponent } from './components/retailer-add/retailer-add.component';
import { RetailerDeleteComponent } from "./components/retailer-delete/retailer-delete.component";
import { RetailerUpdateComponent } from "./components/retailer-update/retailer-update.component";
import { RetailerViewComponent } from "./components/retailer-view/retailer-view.component";
import { RetailersComponent } from './retailers.component';


const routes: Routes = [
  {
  	path: '',
  	component: RetailersComponent,
  	children: [
  	  {
  	  	path: '',
  	  	children: [
     		  {
     		  	path: 'add',
     		  	component: RetailerAddComponent
     		  },
     		  {
     		  	path: 'delete',
     		  	component: RetailerDeleteComponent
     		  },
     		  {
     		  	path: 'update',
     		  	component: RetailerUpdateComponent
     		  },
     		  {
     		  	path: 'view',
     		  	component: RetailerViewComponent
     		  } 		
  	  	]
  	  }
  	]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailersRoutingModule { }
