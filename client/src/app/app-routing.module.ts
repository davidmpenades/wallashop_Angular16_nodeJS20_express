import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  {
    // Ruta para home
    path: "",
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    // Ruta para shop
    path: "shop",
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
  },
  {
    // Ruta para la página de detalle de producto
    path: "detail",
    loadChildren: () => import('./detail-product/detail-product.module').then(m => m.DetailProductModule)
  },
  {
    // Ruta para la página de autenticación
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
