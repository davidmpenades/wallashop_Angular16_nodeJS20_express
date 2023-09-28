import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  data = [
    { image: 'imagen1.jpg', caption: 'Slide 1' },
    { image: 'imagen2.jpg', caption: 'Slide 2' },
    { image: 'imagen3.jpg', caption: 'Slide 3' }
  ];


}
