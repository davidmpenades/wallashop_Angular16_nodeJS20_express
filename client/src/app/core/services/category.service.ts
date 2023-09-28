import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Category } from '../model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private apiService: ApiService
  ) { }

  set(data:{}): Observable<Category[]> {
    return this.apiService.set('/category', data)
  }

  get(): Observable<Category[]> {
    return this.apiService.get('/category')
  }

  getBySlug(slug: string): Observable<Category> {
    return this.apiService.getBySlug('/category', slug)
  }

  deleteCategory(slug:string): Observable<any> {
    return this.apiService.delete('/category',slug)
  }

  updateProd(data:{}): Observable<any> {
    return this.apiService.update('/category', data)
  }
}
