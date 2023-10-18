import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Filters } from 'src/app/core/model/filters.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  filters: Filters = {
    limit: 6,
    offset: 0,
    text: '',
    price_max: 0,
    price_min: 0,
    category: '',
  };
  codeUrl: string = '';
  constructor(private router: Router, private route: ActivatedRoute) {}

  // Método ngOnInit, que se ejecuta durante la inicialización del componente
  // Suscribe a cambios en los parámetros de la ruta
    // Verifica si hay parámetros en la URL
      // Obtiene y decodifica el parámetro 'fil' de la URL si está presente
ngOnInit(): void {
  this.route.params.subscribe((params: Params) => {
    if (Object.keys(params).length != 0) {
      this.codeUrl = params['fil'] == undefined ? '' : params['fil'];
      this.filters.text = JSON.parse(atob(this.codeUrl)).text;
    }
  });
}

// Método para enviar una búsqueda y navegar a la página de resultados con los filtros
  // Navega a la página de resultados con los filtros codificados en la URL
sendSearch() {
  this.router.navigate(['/filters', btoa(JSON.stringify(this.filters))]);
}

}
