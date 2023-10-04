import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from '../core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories!: Category[]

  constructor(
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.categoryService.get({}).subscribe({
      next: (data) => {
        this.categories = data
      },
      error:(error) => {
        console.log(error); 
      }      
    })
  }

  carrousel = {
    res: {
      md: 4,
      lg: 3
    }
  }

}
