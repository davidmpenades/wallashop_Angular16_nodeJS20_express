import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CategoryComponent, SearchComponent, SharedModule } from '../shared';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    
    HomeComponent,
    SearchComponent,
    CategoryComponent
    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
