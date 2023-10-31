import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Product, ProductService } from '../core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product> {
  constructor(
    private productService: ProductService,
    private router: Router,
  ) { }



  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<any> {

    return this.productService.getBySlug(route.params['slug'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
