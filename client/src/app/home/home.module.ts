import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CardCategoryComponent, ListCategoriesComponent, SearchComponent, SharedModule } from '../shared';
import { HomeComponent } from './home.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';


@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    ListCategoriesComponent,
    CardCategoryComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ]
})
export class HomeModule { }
