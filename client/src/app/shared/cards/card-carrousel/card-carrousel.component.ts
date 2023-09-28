import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-carrousel',
  templateUrl: './card-carrousel.component.html',
  styleUrls: ['./card-carrousel.component.scss']
})
export class CardCarrouselComponent {

  @Input() active = false

}
