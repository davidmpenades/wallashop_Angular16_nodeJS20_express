import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from 'src/app/core';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {

  categories!: Category[]

  constructor(
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.getCategories()
  }

  // Método para obtener las categorías
    // Llama al método 'get' del servicio 'categoryService' para obtener las categorías
      // Callback 'next' que se ejecuta cuando la solicitud es exitosa
        // Asigna los datos de las categorías al arreglo 'categories' de la clase
  getCategories() {
    this.categoryService.get({}).subscribe({
      next: (data) => {
        this.categories = data
      }
    })
  }

}
