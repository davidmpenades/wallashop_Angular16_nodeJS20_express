import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Constructor que recibe una instancia de HttpClient
  constructor(private http: HttpClient) {}

  // Método para realizar una solicitud POST
  set(path: string, data: {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, data);
  }

  // Método para realizar una solicitud POST 
  post(path:string, data:{}): Observable<any>{
    return this.http.post(`${environment.api_url}${path}`, data);
  }

  // Método para realizar una solicitud GET
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {    
    return this.http.get(`${environment.api_url}${path}`, { params });
  }

  // Método para realizar una solicitud POST con un slug
  getBySlug(path: string, slug: string): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, { slug });
  }
  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    )
  }

  // Método para realizar una solicitud DELETE
  delete(path: string, slug: string): Observable<any> {
    // Configuración de opciones para la solicitud DELETE
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Ajusta los encabezados según tus necesidades
      }),
      body: { slug }, // Cuerpo de la solicitud DELETE si es necesario
    };

    return this.http.delete(`${environment.api_url}${path}`, options);
  }

  // Método para realizar una solicitud PUT
  update(path: string, data: {}): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, data);
  }

  getById(path: string): Observable<any> {    
    return this.http.get(`${environment.api_url}${path}`);
  }
}
