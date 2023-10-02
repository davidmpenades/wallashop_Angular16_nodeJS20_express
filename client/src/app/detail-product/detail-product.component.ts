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
  product!: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  prod= this.route.snapshot.paramMap.get('slug');

  ngOnInit(): void {
    if(this.prod){
      this.get_product(this.prod);
    }
  }

  get_product(prod: string) {
    this.productService.getBySlug(prod).subscribe({
      next: (data) => {
        this.product = data;
      },
    });
  }
}
