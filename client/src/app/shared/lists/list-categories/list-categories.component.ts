import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from 'src/app/core';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {

  categories!: Category[]

  constructor(
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.categoryService.get().subscribe({
      next: (data) => {
        this.categories = data
      }
    })
  }

}
