import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailProductComponent } from './detail-product.component';

// Define las rutas para el módulo de enrutamiento
const routes: Routes = [
  {
    // Ruta dinámica que captura un parámetro 'slug' en la URL
    path: ':slug',
    // Asocia la ruta con el componente DetailProductComponent
    component: DetailProductComponent,
  },
];

// Decorador NgModule que define el módulo de enrutamiento
@NgModule({
  // Importa el módulo RouterModule con las rutas definidas
  imports: [RouterModule.forChild(routes)],
  // Exporta el módulo RouterModule para que pueda ser utilizado por otros módulos
  exports: [RouterModule],
})
// Exporta la clase del módulo de enrutamiento
export class DetailProductRoutingModule {}
