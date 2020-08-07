import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from "../../../../shared/shared.module";
import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';
import { ProfileSettingsComponent } from './profile-settings.component';


@NgModule({
  declarations: [ProfileSettingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProfileSettingsRoutingModule
  ]
})
export class ProfileSettingsModule { }
