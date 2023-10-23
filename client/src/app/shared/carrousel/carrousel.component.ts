import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent {

  // Decorador @ViewChild para obtener una referencia al elemento con el nombre 'elementRow' en la plantilla
  @ViewChild('elementRow', { static: false }) elementRow!: ElementRef;

  // Decorador @Input para recibir datos desde el componente padre
  @Input() items!: any[];

  // Propiedad que mantiene el índice actual del carrusel
  currentIndex = 0;

  // Método asincrónico para ir a la diapositiva anterior
    // Verifica si no estamos en la primera diapositiva
      // Decrementa el índice
      // Llama a la función para ir a la diapositiva actual

  async prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      await this.goToCurrentIndex();
    }
  }

  // Método asincrónico para ir a la siguiente diapositiva
    // Verifica si no estamos en la última diapositiva
      // Incrementa el índice
        // Llama a la función para ir a la diapositiva actual
  
  // async nextSlide() {
  //   if (this.currentIndex < this.items.length - 1) {
  //     this.currentIndex++;
  //     await this.goToCurrentIndex();
  //   }
  // }

  async nextSlide() {
    if (this.currentIndex < this.items.length - (this.elementRow.nativeElement.clientWidth / this.elementRow.nativeElement.children[0].clientWidth)) {
      this.currentIndex++;
      await this.goToCurrentIndex();
    }
  }

  // Método asincrónico para ir a la diapositiva actual
    // Obtiene el ancho de cada elemento de diapositiva
    // Aplica una transición de 0.5 segundos al desplazamiento horizontal
    // Aplica una transformación para desplazar el carrusel al índice actual

  async goToCurrentIndex() {
    const elementWidth = this.elementRow.nativeElement.children[0].clientWidth;
    this.elementRow.nativeElement.style.transition = `0.5s`;
    this.elementRow.nativeElement.style.transform = `translateX(-${this.currentIndex * elementWidth}px)`;
  }
}
