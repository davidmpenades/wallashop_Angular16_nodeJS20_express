import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailProductRoutingModule } from './detail-product-routing.module';
import { DetailProductComponent } from './detail-product.component';
import { SharedModule } from '../shared';
import { ListCommentsComponent } from './list-comments/list-comments.component';
import { CommentComponent } from './comment/comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DetailProductComponent,
    ListCommentsComponent,
    CommentComponent,
  ],
  imports: [
    CommonModule,
    DetailProductRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ]
})
export class DetailProductModule { }
