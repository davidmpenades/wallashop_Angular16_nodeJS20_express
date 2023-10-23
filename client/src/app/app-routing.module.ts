import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  {
    path: "",// Ruta para home
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: "shop", // Ruta para shop
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)
  },
  {
    path: "detail",// Ruta para la vista de detalle de producto
    loadChildren: () => import('./detail-product/detail-product.module').then(m => m.DetailProductModule)
  },
  {
    path: "auth",// Ruta para la vista de autenticación
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'profile',// Ruta para la vista de perfil
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
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
