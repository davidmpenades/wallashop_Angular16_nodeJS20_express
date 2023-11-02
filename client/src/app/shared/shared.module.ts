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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowAuthedDirective } from './show-authed.directive';
import { LikesComponent } from './likes/likes.component';
import { FollowComponent } from './follow/follow.component';
import { CardUserComponent } from './cards/card-user/card-user.component';
import { CreateProductComponent } from './create-product/create-product.component';


@NgModule({
  declarations: [
    ListProductsComponent,
    CardProductComponent,
    CarrouselComponent,
    CardCarrouselComponent,
    FilterComponent,
    SearchComponent,
    ShowAuthedDirective,
    LikesComponent,
    FollowComponent,
    CardUserComponent,
    CreateProductComponent
   ],
  imports: [
    CommonModule,
    RouterModule,
    NgxBootstrapIconsModule.pick(allIcons),
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ListProductsComponent,
    CardProductComponent,
    CarrouselComponent,
    CardCarrouselComponent,
    FilterComponent,
    SearchComponent,
    CommonModule,
    FormsModule,
    ShowAuthedDirective,
    LikesComponent,
    FollowComponent,
    CardUserComponent,
    CreateProductComponent
  ],
})
export class SharedModule { }
