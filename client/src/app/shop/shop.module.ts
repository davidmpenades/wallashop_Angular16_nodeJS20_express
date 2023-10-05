import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { SharedModule } from '../shared';



@NgModule({
  declarations: [
    ShopComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,    
    NgxBootstrapIconsModule.pick(allIcons)
  ]
})
export class ShopModule { }
