import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category, CategoryService, ProductService } from 'src/app/core';
import { Filters } from 'src/app/core/model/filters.model';
import { Product } from 'src/app/core/model/product.model';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  products: Product[] = []
  categories: Category[] = []
  
  filters: Filters = {
    limit: 8,
    offset: 0,
    text: '',
    price_max: 0,
    price_min: 0,
    category: '',
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
  ) { }

  categ = this.route.snapshot.paramMap.get('slug')

  ngOnInit(): void {
    this.controller({})
    this.getCateries()
  }

  controller(filters?:any){
  this.filters = filters
    if (this.categ) {
      this.getProductsByCategory(this.categ)
    } else {
      this.getProducts()
    }
  }

  getProductsByCategory(cat: string) {
    this.productService.getBySlugCategory(cat).subscribe({
      next: (data) => {
        this.products = data
      }
    })
  }

  getProducts() {
    const params = this.getRequestParams()

    this.productService.get(params).subscribe({
      next: (data) => {
       
        this.products = this.products.concat(data)
        this.filters.offset = this.filters.offset + 8
      }
    })
  }
  getRequestParams(): any {
    let params: any = {};

    params[`offset`] = this.filters.offset;
    params[`limit`] = this.filters.limit;
    params[`price_min`] = this.filters.price_min
    params[`price_max`] = this.filters.price_max
    params[`text`] = this.filters.text
    params[`category`] = this.filters.category


    return params;
  }
  getCateries(){
    this.categoryService.get({}).subscribe({
      next:(data) => {
        this.categories = data        
      }
    })
  }
  scroll(){    
    this.controller()
  }
}
