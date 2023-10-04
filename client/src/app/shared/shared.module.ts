import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './lists';
import { CardProductComponent } from './cards';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    ListProductsComponent,
    CardProductComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    InfiniteScrollModule
  ],
  exports:[
    ListProductsComponent,
    CardProductComponent
  ]
})
export class SharedModule { }
