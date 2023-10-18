import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Category } from '../model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // Constructor que recibe una instancia de ApiService
  constructor(
    private apiService: ApiService
  ) { }

  // Método para realizar una solicitud POST para agregar una nueva categoría
  set(data: {}): Observable<Category[]> {
    return this.apiService.set('/category', data);
  }

  // Método para realizar una solicitud GET para obtener categorías con parámetros opcionales
  get(params: any): Observable<Category[]> {
    return this.apiService.get('/category', params);
  }

  // Método para realizar una solicitud GET para obtener una categoría por su slug
  getBySlug(slug: string): Observable<Category> {
    return this.apiService.getBySlug('/category', slug);
  }

  // Método para realizar una solicitud DELETE para eliminar una categoría por su slug
  deleteCategory(slug: string): Observable<any> {
    return this.apiService.delete('/category', slug);
  }

  // Método para realizar una solicitud PUT para actualizar una categoría
  updateProd(data: {}): Observable<any> {
    return this.apiService.update('/category', data);
  }
}
