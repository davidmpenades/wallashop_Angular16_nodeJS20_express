import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  set(path: string, data: {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, data);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    
    return this.http.get(`${environment.api_url}${path}`,{params});
  }

  getBySlug(path: string, slug: string): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, { slug });
  }

  delete(path: string, slug: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', //  ajusta los encabezados según tus necesidades
      }),
      body: { slug }, // Cuerpo de la solicitud DELETE si es necesario
    };

    return this.http.delete(`${environment.api_url}${path}`, options);
  }

  update(path: string, data: {}): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, data);
  }
}
