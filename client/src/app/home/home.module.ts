import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CardCarrouselComponent, CardCategoryComponent, CarrouselComponent, ListCategoriesComponent, SearchComponent, SharedModule } from '../shared';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    CarrouselComponent,
    CardCarrouselComponent,
    ListCategoriesComponent,
    CardCategoryComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
