import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: "",
    // Asocia la ruta con el componente HomeComponent
    component: HomeComponent
  }
];

// Decorador NgModule que define el módulo de enrutamiento
@NgModule({
  // Importa el módulo RouterModule con las rutas definidas
  imports: [RouterModule.forChild(routes)],
  // Exporta el módulo RouterModule para que pueda ser utilizado por otros módulos
  exports: [RouterModule]
})
// Exporta la clase del módulo de enrutamiento
export class HomeRoutingModule { }
