import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './lists';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { CardCarrouselComponent, CardProductComponent } from './cards';
import { RouterModule } from '@angular/router';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FilterComponent } from './filter/filter.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListProductsComponent,
    CardProductComponent,
    CarrouselComponent,
    CardCarrouselComponent,
    FilterComponent,
    SearchComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxBootstrapIconsModule.pick(allIcons),
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule
  ],
  exports: [
    ListProductsComponent,
    CardProductComponent,
    CarrouselComponent,
    CardCarrouselComponent,
    FilterComponent,
    SearchComponent,
    CommonModule,
    FormsModule
  ],
})
export class SharedModule { }
