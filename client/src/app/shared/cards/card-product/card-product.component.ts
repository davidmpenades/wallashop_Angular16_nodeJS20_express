import { Component, Input } from '@angular/core';
import { Product } from 'src/app/core/model/product.model';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent {

  @Input() data!: Product

}
