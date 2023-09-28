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

  products!: Product[]

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  categ = this.route.snapshot.paramMap.get('slug')

  ngOnInit(): void {

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
    this.productService.get().subscribe({
      next: (data) => {
        this.products = data
        console.log(data);
      }
    })
  }
}
