import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './lists';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { CardCarrouselComponent, CardProductComponent } from './cards';
import { RouterModule } from '@angular/router';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

@NgModule({
  declarations: [
    ListProductsComponent,
    CardProductComponent,
    CarrouselComponent,
    CardCarrouselComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  exports: [
    ListProductsComponent,
    CardProductComponent,
    CarrouselComponent,
    CardCarrouselComponent
  ]
})
export class SharedModule { }
