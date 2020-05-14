import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyersComponent } from './buyers.component';
import { BuyerAddComponent } from './components/buyer-add/buyer-add.component'
import { BuyerDeleteComponent } from "./components/buyer-delete/buyer-delete.component";
import { BuyerUpdateComponent } from "./components/buyer-update/buyer-update.component";
import { BuyerViewComponent } from "./components/buyer-view/buyer-view.component";

const routes: Routes = [
  {
  	path: '',
  	component: BuyersComponent,
  	children: [
  	  {
  	  	path: '',
  	  	children: [
     		  {
     		  	path: 'add',
     		  	component: BuyerAddComponent
     		  },
     		  {
     		  	path: 'delete',
     		  	component: BuyerDeleteComponent
     		  },
     		  {
     		  	path: 'update',
     		  	component: BuyerUpdateComponent
     		  },
     		  {
     		  	path: 'view',
     		  	component: BuyerViewComponent
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
export class BuyersRoutingModule { }
