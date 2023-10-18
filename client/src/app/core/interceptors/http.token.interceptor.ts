import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from '../services';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  // Método intercept que se ejecuta antes de cada solicitud HTTP
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    const headersConfig = {// Configuración inicial de encabezados
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization':''
    };

    // Obtener el token del servicio JwtService
    const token = this.jwtService.getToken();

    // Si hay un token, agregar el encabezado de autorización a la configuración de encabezados
    if (token) {      
      headersConfig['Authorization']= `Token ${token}`;
    }

    // Clonar la solicitud original y establecer los encabezados configurados
    const request = req.clone({ setHeaders: headersConfig });

    // Continuar con la solicitud clonada
    return next.handle(request);
  }
}
