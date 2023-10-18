import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { Filters } from '../model/filters.model';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Constructor que recibe una instancia de ApiService
  constructor(private apiService: ApiService) {}

  // Método para realizar una solicitud POST para agregar un nuevo producto
  set(data: {}): Observable<Product[]> {
    return this.apiService.set('/product', data);
  }

  // Método para realizar una solicitud GET para obtener productos con parámetros opcionales
  get(params: any): Observable<{products: Product[], total_products: number}> {
    return this.apiService.get('/product', params);
  }

  // Método para realizar una solicitud GET para obtener un producto por su slug
  getBySlug(slug: string): Observable<Product> {
    return this.apiService.getBySlug('/product/detail', slug);
  }

  // Método para realizar una solicitud GET para obtener productos por la categoría
  getBySlugCategory(slug: string): Observable<Product[]> {
    return this.apiService.getBySlug('/productsByCategory', slug);
  }
  
  // Método para realizar una solicitud GET para obtener productos con filtros
  getProductsWithFilters(filters: Filters): Observable<{products:Product[], total_products: number}>{
    let params = {}
    params = filters    
    return this.apiService.get('product', new HttpParams({fromObject: params}));
  }

  // Método para realizar una solicitud DELETE para eliminar un producto por su slug
  deleteProduct(slug: string): Observable<any> {
    return this.apiService.delete('/product', slug);
  }

  // Método para realizar una solicitud PUT para actualizar un producto
  updateProd(data: {}): Observable<any> {
    return this.apiService.update('/product', data);
  }
}
