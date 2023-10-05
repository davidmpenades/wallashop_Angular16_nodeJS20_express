import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/core';
import { Filters } from 'src/app/core/model/filters.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  filters: Filters = {
    limit: 8,
    offset: 0,
    text: '',
    price_max: 0,
    price_min: 0,
    category: '',
  };


  constructor() {}
  @Input() categories?: Category[];
  @Output() sendFilters = new EventEmitter<Filters>


  ngOnInit(): void {
    this.setFilters()
  }

  setFilters(){
    this.sendFilters.emit(this.filters)
  }
}
