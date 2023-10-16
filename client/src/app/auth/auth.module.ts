import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ]
})
export class AuthModule { }
