import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: "shop",
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
  },
  {
    path: "detail",
    loadChildren: () => import('./detail-product/detail-product.module').then(m => m.DetailProductModule)
  },
  {
    path: "auth",
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, {

    preloadingStrategy: QuicklinkStrategy,
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
