import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoAuthGuard } from '../core/guards/no-auth-guard.service';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NgxBootstrapIconsModule.pick(allIcons),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[NoAuthGuard]
})
export class AuthModule { }
