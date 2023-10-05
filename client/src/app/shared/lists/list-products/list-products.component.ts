import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core';
import { Product } from 'src/app/core/model/product.model';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  products: Product[] = []
  offset = 0
  limit = 8
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  categ = this.route.snapshot.paramMap.get('slug')

  ngOnInit(): void {
    this.controller()
  }

  controller(){
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
    const params = this.getRequestParams(this.offset, this.limit)

    this.productService.get(params).subscribe({
      next: (data) => {
        console.log(data);

        this.products = this.products.concat(data.products)
        this.limit = 4
        this.offset = this.offset + 4
      }
    })
  }
  getRequestParams(offset: number, limit: number): any {
    let params: any = {};

    params[`offset`] = offset;
    params[`limit`] = limit;

    return params;
  }
  scroll(){
    this.controller()
  }
}
