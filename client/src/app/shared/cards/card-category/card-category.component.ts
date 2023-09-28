import { Component, Input } from '@angular/core';
import { Category } from 'src/app/core';

@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.scss']
})
export class CardCategoryComponent {

  @Input() data!: Category

}
