import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

import { AuthGuard } from './core/guard/auth.guards';

const routes: Routes = [
  { 
  	path: '', 
    loadChildren: () => import('./features/homepage/homepage.module').then(m => m.HomepageModule), 
    canActivate: [AuthGuard]
  },
  { 
  	path: 'login', 
  	loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
  },
  { 
    path: 'register',
    loadChildren: () => import('./features/register/register.module').then(m => m.RegisterModule) },
  { 
	  path: 'dashboard-medical-center', 
    loadChildren: () => import('./features/medical-dashboard/medical-dashboard.module').then(m => m.MedicalDashboardModule), 
    canActivate: [AuthGuard]
  },
  { 
    path: 'place-order',
    loadChildren: () => import('./features/place-order/place-order.module').then(m => m.PlaceOrderModule),
    // canActivate: [AuthGuard]
  },
  {
  	path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
