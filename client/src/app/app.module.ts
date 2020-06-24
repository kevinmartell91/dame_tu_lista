//https://georgebyte.com/scalable-angular-app-architecture/#22-core-module
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

// import { HTTP_INTERCEPTORS } from '@angular/common/http'
// import { ErrorInterceptors  } from './core/interceptors/error.interceptor'; 
// import { TokenInterceptor } from './core/interceptors/token.interceptor';
// import { AuthenticationService } from './core/services/authentication.service';
// import { AuthService } from './features/login/services/auth.service';
import { CoreModule } from "./core/core.module";

import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    //Angular Modules
    AppComponent,

    PageNotFoundComponent,
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    HttpClientModule,

    // App Inizialization Module
    HammerModule,

    // Core Modules
    CoreModule,

    // Feature modules

    
    // SharedModule,
    BrowserAnimationsModule,    

    // App routing - should be the last import
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

/* Core modules 
     Core module is dedicated to singleton providers
     (Observable store / services) provided in injector.
     These services contians bussines logic used by other
     core services or app's features.
*/

/* Feature modules 
     Components that work together to implement an app's
     feature. Their only concern should be their 
     own features and they should care as little as 
     possible about other parts of the app. Connection 
     to the "outside world" are made from feature's 
     services to services in CoreModules.
     No communication with other features directly, so
     we prevent dependancies/tight coupling between 
     features
*/

/* SharedModule 
     think about SharedModule as a private node_modules,
     where no components, directives or anything
     else from SharedModule should depend on any
     other module, component, provider, etc.
*/


// https://angular.io/guide/lazy-loading-ngmodules