import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../core/model/product.model';
import { ProductService, UserService } from '../core';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Filters } from '../core/model/filters.model';
import { BehaviorSubject } from 'rxjs';
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
  productsReleated: Product[] = [];
  iOwner: boolean = false
  dataObservable = new BehaviorSubject<any>({} as Product);

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

  id: string = ''
  slug: string = this.route.snapshot.paramMap.get('slug')!
  constructor(
    private productService: ProductService,
    private commentService: CommentService,
    private route: ActivatedRoute,
    private tosatr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: any) => {
        this.dataObservable.next(data.product);
        this.product = data.product;
        this.images = this.product.imgs
        this.userService.currentUser.subscribe((userData) => {
          if (userData._id === this.product.owner) {
            this.iOwner = true
          } else {
            this.iOwner = false
          }
        });
        this.getProducts()
      }
    );
    this.userService.currentUser.subscribe((userData) => {
      if (userData._id === this.product.owner) {
        this.iOwner = true
      }
    });
  }

  async getProducts() {

    const params = await this.getRequestParams();
        // Verifica si 'prod' tiene un valor y llama a 'get_product' si es así
    if(this.slug){
      this.get_product(this.slug);
    }
  }

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
