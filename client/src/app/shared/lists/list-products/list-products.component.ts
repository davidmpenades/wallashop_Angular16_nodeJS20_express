import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category, CategoryService, ProductService } from 'src/app/core';
import { Filters } from 'src/app/core/model/filters.model';
import { Product } from 'src/app/core/model/product.model';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];

  filters: Filters = {
    limit: 6,
    offset: 0,
    text: '',
    price_max: 0,
    price_min: 0,
    category: '',
  };
  pages: Array<Number> = [];
  text: string = '';
  codeUrl: string = '';
  categ = this.route.snapshot.paramMap.get('slug');
  currentPage: number = 1;
  titleCategory: String = '';

  @Input() scrollOn: boolean = false;
  @Input() filtersOn: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  // Implementación del método ngOnInit del componente
    // Al inicializar el componente, se obtienen las categorías y se suscribe a cambios en los parámetros de la ruta
      // Se obtiene y decodifica el parámetro 'fil' de la URL
      // Se llama al método controller con los filtros obtenidos de la URL o los filtros por defecto
  ngOnInit(): void {
    this.getCategories();

    this.route.params.subscribe((params: Params) => {
      this.codeUrl = params['fil'] == undefined ? '' : params['fil'];

      if (this.codeUrl) {
        this.controller(JSON.parse(atob(this.codeUrl)));
      } else {
        this.controller(this.filters);
      }
    });
  }

  // Método controller que gestiona la lógica principal
    // Si hay una categoría seleccionada, se obtienen los productos por categoría
      // Si se han aplicado nuevos filtros, se reinician algunos valores y se obtienen nuevos productos
  controller(filters2: Filters) {
    if (this.categ) {
      this.getProductsByCategory(this.categ);
    } else {
      if (filters2 != this.filters) {
        this.products = [];
        this.filters.offset = 0;
        this.currentPage = 1;
      }

      // Se actualizan los filtros con los valores obtenidos
      if (filters2.text != '') {
        this.filters.text = filters2.text;
        if (filters2.category != '') {
          this.filters.category = filters2.category;
        }
        if (filters2.price_max != 0) {
          this.filters.price_max = filters2.price_max;
        }
        if (filters2.price_min != 0) {
          this.filters.price_min = filters2.price_min;
        }
      } else {
        this.filters.price_max = filters2.price_max;
        this.filters.price_min = filters2.price_min;
        this.filters.category = filters2.category;
      }

      // Se obtienen los productos con los filtros actuales
      this.getProducts();
    }
  }

  // Método para obtener productos por categoría
  getProductsByCategory(cat: string) {
    this.productService.getBySlugCategory(cat).subscribe({
      next: (data) => {
        this.products = data;
      },
    });
  }

  // Método asincrónico para obtener productos con los filtros actuales
    // Se obtienen los parámetros de la solicitud
      // Se realiza la solicitud para obtener productos


  async getProducts() {
    const params2 = await this.getRequestParams();

    this.productService.get(params2).subscribe({
      next: (data) => {
        // Se concatenan los nuevos productos a la lista existente
        this.products = this.products.concat(data.products);
        this.filters.limit = 6;
        this.filters.offset = this.filters.offset + 6;

        // Se actualizan las páginas en función del total de productos
        this.pages = Array.from(
          new Array(Math.ceil(data.total_products / 6)),
          (val, index) => index + 1
        );
      },
    });
  }

  // Método para establecer la página actual y obtener productos
  setPage(pageNumber: any) {
    this.currentPage = pageNumber;
    this.filters.offset = this.currentPage * 6 - 6;
    this.products = [];
    this.getProducts();
  }

  // Método asincrónico para obtener parámetros de solicitud
  async getRequestParams() {
    const params = new HttpParams()
      .set('limit', this.filters.limit.toString())
      .set('offset', this.filters.offset.toString())
      .set('text', this.filters.text)
      .set('price_max', this.filters.price_max.toString())
      .set('price_min', this.filters.price_min.toString())
      .set('category', this.filters.category);

    return params;
  }

  // Método para obtener categorías
  getCategories() {
    this.categoryService.get({}).subscribe({
      next: (data) => {
        this.categories = data;
      },
    });
  }

  // Método para establecer el título de la categoría
  setTitle(title: string) {
    this.titleCategory = title;
  }

  // Método para realizar un scroll solo si esta activado y actualizar la vista con los filtros actuales
  scroll() {
    if (this.scrollOn == true) {
      this.controller(this.filters);
    }
  }
}
