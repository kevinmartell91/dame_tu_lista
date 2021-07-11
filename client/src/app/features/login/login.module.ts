import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, SharedModule],
  providers: [],
})
export class LoginModule {}
// https://jasonwatmore.com/post/2019/06/22/angular-8-jwt-authentication-example-tutorial#auth-guard-ts
// https://www.positronx.io/angular-jwt-user-authentication-tutorial/
// TO use environments files
