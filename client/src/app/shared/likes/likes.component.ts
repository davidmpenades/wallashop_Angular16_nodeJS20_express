import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductService, UserService } from 'src/app/core';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss'],
})
export class LikesComponent {
  isliked: boolean = false;
  user: any = {};

  constructor(
    private productService: ProductService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() product?: Product;
  @Output() isLiked = new EventEmitter<boolean>();

  likeProduct() {
    this.user = this.userService.getCurrentUser();
    if (Object.entries(this.user).length !== 0) {
      this.productService
        .setLike({ slug: this.product?.slug })
        .subscribe((data) => {
          this.isliked = true;
          this.isLiked.emit(this.isliked);
        });
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
