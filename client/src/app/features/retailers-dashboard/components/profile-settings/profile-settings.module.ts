import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';
import { ProfileSettingsComponent } from './profile-settings.component';
import { SharedModule } from "../../../../shared/shared.module";

@NgModule({
  declarations: [ProfileSettingsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProfileSettingsRoutingModule
  ]
})
export class ProfileSettingsModule { }
