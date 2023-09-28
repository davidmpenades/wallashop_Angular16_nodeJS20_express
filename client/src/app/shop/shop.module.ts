import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { CardProductComponent, ListProductsComponent } from '../shared';


@NgModule({
  declarations: [
    ShopComponent,
    ListProductsComponent,
    CardProductComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
