import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';
import { ApiService } from './api.service';
import { Filters } from '../model/filters.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiService: ApiService) {}

  set(data: {}): Observable<Product[]> {
    return this.apiService.set('/product', data);
  }

  get(params: any): Observable<{products: Product[], total_products: number}> {
    
    return this.apiService.get('/product', params);
  }

  getBySlug(slug: string): Observable<Product> {
    return this.apiService.getBySlug('/product/detail', slug);
  }

  getBySlugCategory(slug: string): Observable<Product[]> {
    return this.apiService.getBySlug('/productsByCategory', slug);
  }
  
  getProductsWithFilters(filters: Filters): Observable<{products:Product[], total_products: number}>{
    let params = {}
    params = filters    
    return this.apiService.get('product', new HttpParams({fromObject: params}))
  }

  deleteProduct(slug: string): Observable<any> {
    return this.apiService.delete('/product', slug);
  }

  updateProd(data: {}): Observable<any> {
    return this.apiService.update('/product', data);
  }
}
