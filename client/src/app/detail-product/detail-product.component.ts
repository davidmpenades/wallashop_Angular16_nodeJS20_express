import { Component } from '@angular/core';
import { Product } from '../core/model/product.model';
import { ProductService } from '../core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent {
  product: Product = {} as Product;
  images!: String[];
  owner?: String;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  // Obtiene el valor del parámetro 'slug' desde la URL usando ActivatedRoute

  ngOnInit(): void {


        // Verifica si 'prod' tiene un valor y llama a 'get_product' si es así
    if(this.route.snapshot.paramMap.get('slug')){
      this.get_product(this.route.snapshot.paramMap.get('slug'));
    }
  }

  // Obtiene el producto por su slug
  get_product(prod: any) {
    this.productService.getBySlug(prod).subscribe({
      next: (data) => {
        this.product = data;
        this.images = this.product.imgs
      },
      error: (err) => console.error(err),
    });
  }
}
