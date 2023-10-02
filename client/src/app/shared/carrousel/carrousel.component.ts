import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent {

  @ViewChild('elementRow', { static: false }) elementRow!: ElementRef;

  @Input() items!: any[]

  currentIndex = 0;

  async prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      await this.goToCurrentIndex();
    }
  }

  async nextSlide() {
    if (this.currentIndex < this.items.length - (this.elementRow.nativeElement.clientWidth / this.elementRow.nativeElement.children[0].clientWidth)) {
      this.currentIndex++;
      await this.goToCurrentIndex();
    }
  }

  async goToCurrentIndex() {
    const elementWidth = this.elementRow.nativeElement.children[0].clientWidth;
    this.elementRow.nativeElement.style.transition = `0.5s`;
    this.elementRow.nativeElement.style.transform = `translateX(-${this.currentIndex * elementWidth}px)`;
  }
}
