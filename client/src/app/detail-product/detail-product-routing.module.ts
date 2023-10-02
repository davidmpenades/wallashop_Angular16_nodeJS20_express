import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailProductComponent } from './detail-product.component';

const routes: Routes = [
  {
    path: ':slug',
    component: DetailProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailProductRoutingModule {}
