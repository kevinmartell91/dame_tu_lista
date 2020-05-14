import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalDashboardComponent } from './medical-dashboard.component';

const routes: Routes = [
  { 
  	path: '', 
  	component: MedicalDashboardComponent,
    children: [
      // { 
    	 // path: '', redirectTo: 'patients'
      // },
      { path: 'buyers', loadChildren: () => import('../buyers/buyers.module').then(m => m.BuyersModule) },
      { path: 'retailers', loadChildren: () => import('../retailers/retailers.module').then(m => m.RetailersModule) }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalDashboardRoutingModule { }
