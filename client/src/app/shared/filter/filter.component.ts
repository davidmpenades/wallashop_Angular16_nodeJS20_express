import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Category } from 'src/app/core';
import { Filters } from 'src/app/core/model/filters.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  filters2: Filters = {
    limit: 6,
    offset: 0,
    text: '',
    price_max: 0,
    price_min: 0,
    category: '',
  };
  codeUrl: string = ''
  titleCategory: String = ''

  constructor(private router: Router,
    private route: ActivatedRoute,
    ) {}

  // Decoradores @Input y @Output para recibir y emitir datos hacia/desde el componente padre
  @Input() categories!: Category[];
  @Output() newtitleCategory = new EventEmitter<any>();

  // Suscribe a cambios en los parámetros de la ruta para actualizar los filtros
    // Obtiene el código de la URL y actualiza los valores de los filtros
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.codeUrl = params['fil'] == undefined ? '' : params['fil'];
      this.filters2.text = JSON.parse(atob(this.codeUrl)).text;
      this.filters2.price_max = JSON.parse(atob(this.codeUrl)).price_max;
      this.filters2.price_min = JSON.parse(atob(this.codeUrl)).price_min;
      if(JSON.parse(atob(this.codeUrl)).category != ''){
        this.filters2.category = JSON.parse(atob(this.codeUrl)).category;
      }
      
    });
  }

  // Método para establecer los filtros y navegar a la página de resultados
    // Navega a la página de resultados con los filtros codificados en la URL
      // Actualiza el título de la categoría y emite el evento al componente padre
  setFilters() {
    this.router.navigate(['/filters',btoa(JSON.stringify(this.filters2))]);
    this.titleCategory = this.categories.filter(categ => categ.slug == this.filters2.category)[0].title
    this.newtitleCategory.emit(this.titleCategory)

  }
  // Método para eliminar los filtros y navegar a la página principal de tienda
  deleteFilters(){
    this.router.navigate(['/shop']);
  }
}