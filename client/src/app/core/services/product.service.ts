import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiService: ApiService) {}

  set(data: {}): Observable<Product[]> {
    return this.apiService.set('/product', data);
  }

  get(params: any): Observable<Product[]> {
    return this.apiService.get('/product', params);
  }

  getBySlug(slug: string): Observable<Product> {
    return this.apiService.getBySlug('/product/detail', slug);
  }

  getBySlugCategory(slug: string): Observable<Product[]> {
    return this.apiService.getBySlug('/productsByCategory', slug);
  }

  deleteProduct(slug: string): Observable<any> {
    return this.apiService.delete('/product', slug);
  }

  updateProd(data: {}): Observable<any> {
    return this.apiService.update('/product', data);
  }
}
