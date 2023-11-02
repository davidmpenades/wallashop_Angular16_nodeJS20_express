import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../core/model/product.model';
import { ProductService } from '../core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../core/services/comment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent {
  product: Product = {} as Product;
  images!: String[];
  owner?: String;
  id: string = ''
  slug: string = this.route.snapshot.paramMap.get('slug')!
  constructor(
    private productService: ProductService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private tosatr: ToastrService
  ) {}

  // Obtiene el valor del parámetro 'slug' desde la URL usando ActivatedRoute

  ngOnInit(): void {


        // Verifica si 'prod' tiene un valor y llama a 'get_product' si es así
    if(this.slug){
      this.get_product(this.slug);
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

  delId(id:string) {
    this.commentService.deleteComment(this.slug, id).subscribe({
      next: (data) => {
        this.tosatr.success('Comentario eliminado', 'Comentario');
        window.location.reload();
      },
      error: (err) => console.error(err),
    });      
  }

}
