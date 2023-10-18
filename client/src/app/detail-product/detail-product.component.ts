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
  images!: String[];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  // Obtiene el valor del parámetro 'slug' desde la URL usando ActivatedRoute
  prod= this.route.snapshot.paramMap.get('slug');

  ngOnInit(): void {
        // Verifica si 'prod' tiene un valor y llama a 'get_product' si es así
    if(this.prod){
      this.get_product(this.prod);
    }
  }

    // Método para obtener detalles del producto por su slug
      // Callback 'next' que se ejecuta cuando la solicitud es exitosa
        // Asigna los datos del producto y las imágenes a las propiedades del componente
  get_product(prod: string) {
    this.productService.getBySlug(prod).subscribe({
      next: (data) => {
        this.product = data;
        this.images = this.product.imgs
      },
    });
  }
}
