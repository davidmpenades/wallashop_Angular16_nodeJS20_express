import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent {
  @Input() iOwner: boolean = false
  @Output() delete = new EventEmitter<boolean>();

  deleteProduct() {
    this.delete.emit(true)
  }
}
