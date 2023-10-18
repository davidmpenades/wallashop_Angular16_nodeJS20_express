import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from '../core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Declara una propiedad categories que será un array de objetos Category
  categories!: Category[];

  // Inyecta el servicio CategoryService en el constructor
  constructor(
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    // Llama al método getCategories al inicializar el componente
    this.getCategories();
  }

  // Método para obtener las categorías
    // Llama al método get del servicio CategoryService
      // Callback 'next' que se ejecuta cuando la solicitud es exitosa
        // Asigna los resultados a la propiedad categories
          // Callback 'error' que se ejecuta cuando hay un error en la solicitud
  getCategories() {
    this.categoryService.get({}).subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.log(error); 
      }      
    });
  }

  // Objeto carrousel que parece definir la cantidad de elementos a mostrar en diferentes resoluciones
  carrousel = {
    res: {
      md: 4,
      lg: 3
    }
  }

}
