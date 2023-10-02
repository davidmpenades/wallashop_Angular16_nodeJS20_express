import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { CardProductComponent, ListProductsComponent } from '../shared';
import { DetailProductModule } from '../detail-product/detail-product.module';


@NgModule({
  declarations: [
    ShopComponent,
    ListProductsComponent,
    CardProductComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
