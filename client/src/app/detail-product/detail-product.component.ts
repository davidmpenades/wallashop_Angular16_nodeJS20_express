import { Component } from '@angular/core';
import { Product } from '../core/model/product.model';
import { ProductService } from '../core';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Filters } from '../core/model/filters.model';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent {
  product: Product = {} as Product;
  images!: String[];
  owner?: String;
  productsReleated: Product[] = [];

  filters: Filters = {
    limit: 6,
    offset: 0,
    text: '',
    price_max: 0,
    price_min: 0,
    category: '',
    owner: '',
    profileLikes: ''
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  // Obtiene el valor del parámetro 'slug' desde la URL usando ActivatedRoute

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: any) => {
        this.product = data.product;
        this.images = this.product.imgs
        this.getProducts()
      }
    );
  }

  // Obtiene el producto por su slug
  // get_product(prod: any) {
  //   this.productService.getBySlug(prod).subscribe({
  //     next: (data) => {
  //       this.product = data;
  //       this.images = this.product.imgs
  //       this.getProducts()
  //     },
  //     error: (err) => console.error(err),
  //   });
  // }

  async getProducts() {

    const params = await this.getRequestParams();

    this.productService.get(params).subscribe({
      next: (data) => {
        this.productsReleated = data.products.filter((prod) => prod.slug != this.product.slug)
      },
    });
  }

  async getRequestParams() {
    const params = new HttpParams()
      .set('limit', this.filters.limit.toString())
      .set('offset', this.filters.offset.toString())
      .set('text', this.filters.text)
      .set('price_max', this.filters.price_max.toString())
      .set('price_min', this.filters.price_min.toString())
      .set('category', this.product.category)
      .set('owner', this.filters.owner)
      .set('profileLikes', this.filters.profileLikes)

    return params;
  }
}
