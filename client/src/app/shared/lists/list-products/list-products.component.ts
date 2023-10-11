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
  titleCategory: String = ''

  @Input() scrollOn: boolean = false;
  @Input() filtersOn: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

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

  controller(filters2: Filters) {
    if (this.categ) {
      this.getProductsByCategory(this.categ);
    } else {
      if (filters2 != this.filters) {
        this.products = [];
        this.filters.offset = 0;
        this.currentPage = 1;
      }
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
      this.getProducts();
    }
  }

  getProductsByCategory(cat: string) {
    this.productService.getBySlugCategory(cat).subscribe({
      next: (data) => {
        this.products = data;
      },
    });
  }

  async getProducts() {
    const params2 = await this.getRequestParams();

    this.productService.get(params2).subscribe({
      next: (data) => {
        this.products = this.products.concat(data.products);
        this.filters.limit = 6;
        this.filters.offset = this.filters.offset + 6;
        this.pages = Array.from(
          new Array(Math.ceil(data.total_products / 6)),
          (val, index) => index + 1
        );
      },
    });
  }

  setPage(pageNumber: any) {
    this.currentPage = pageNumber;
    this.filters.offset = this.currentPage * 6 - 6;
    this.products = [];
    this.getProducts();
  }

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
  getCategories() {
    this.categoryService.get({}).subscribe({
      next: (data) => {
        this.categories = data;
      },
    });
  }

  setTitle(title: String){
    this.titleCategory = title
  }
  scroll() {
    if (this.scrollOn == true) {
      this.controller(this.filters);
    }
  }
}
