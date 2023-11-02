import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    owner: '',
    profileLikes: ''
  };
  codeUrl: string = ''
  titleCategory: String = ''

  constructor(private router: Router,
    private route: ActivatedRoute,
  ) { }
  @Input() categories!: Category[]; // Recibe las categorías del componente padre
  @Output() newtitleCategory = new EventEmitter<any>(); // Emite el título de la categoría al componente padre

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (Object.keys(params).length != 0) {
        this.codeUrl = params['fil'] == undefined ? '' : params['fil'];// Recoge los filtros de la url
        this.filters2.text = JSON.parse(atob(this.codeUrl)).text;// Decodifica los filtros de la url
        this.filters2.price_max = JSON.parse(atob(this.codeUrl)).price_max;// Decodifica los filtros de la url
        this.filters2.price_min = JSON.parse(atob(this.codeUrl)).price_min;
        if (JSON.parse(atob(this.codeUrl)).category != '') {
          this.filters2.category = JSON.parse(atob(this.codeUrl)).category;
        }
      }

    });
  }

  // Método para aplicar los filtros y navegar a la página principal de tienda
  setFilters() {
    this.router.navigate(['/filters', btoa(JSON.stringify(this.filters2))]);
    this.titleCategory = this.categories.filter(categ => categ.slug == this.filters2.category)[0].title
    this.newtitleCategory.emit(this.titleCategory)

  }
  // Método para eliminar los filtros y navegar a la página principal de tienda
  deleteFilters() {
    this.router.navigate(['/shop']);
  }
}
