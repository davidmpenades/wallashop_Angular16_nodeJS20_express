import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,  
    FormsModule,
    ReactiveFormsModule, 
    SharedModule
  ],
  declarations: [
    ProfileComponent,
    SettingsComponent
  ]
})
export class ProfileModule { }
