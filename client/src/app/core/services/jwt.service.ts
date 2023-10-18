import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  // Método para obtener el token JWT almacenado en el localStorage
  getToken(): string {
    return window.localStorage['jwtToken'];
  }

  // Método para guardar el token JWT en el localStorage
  saveToken(token: string) {
    window.localStorage['jwtToken'] = token;
  }

  // Método para eliminar el token JWT del localStorage
  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }
}
