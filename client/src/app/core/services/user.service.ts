import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, ReplaySubject, distinctUntilChanged, map } from 'rxjs';
import { Register, User } from '../model/user.model';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService, private jwtService: JwtService) {}

  populate() {
    // If JWT detected, attempt to get & store user's info
    const token = this.jwtService.getToken();

    if (token) {

      this.apiService.get("/user/profile").subscribe(
        (data) => {
          return this.setAuth({ ...data.user, token });
        },
        (err) => {this.purgeAuth(); console.log(err);
        }
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  // guarda jwt que viene desde el server en localstorage
  // Set current user data into observable
  // cambia isAuthenticated a true
  setAuth(data: any) {

    this.jwtService.saveToken(data.token);
    this.currentUserSubject.next(data);
    this.isAuthenticatedSubject.next(true);
  }

  // Método para purgar la autenticación (cerrar sesión)
    // Destruye el token almacenado en el almacenamiento local
    // Establece el sujeto del usuario actual como un objeto de usuario vacío
    // Establece el sujeto de autenticación como falso
  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  // Método para intentar autenticar o registrar a un usuario
    // Utiliza el servicio ApiService para hacer una solicitud POST a la ruta '/users' con las credenciales
    // Si se recibe respuesta correcta, llama al método setAuth y pasa los datos del usuario
    // Utiliza el operador 'map' para transformar la respuesta de la solicitud
      // Llama al método 'setAuth' para establecer la autenticación con los datos del usuario
      // Devuelve los datos completos de la respuesta (incluyendo el usuario)
  attempAuth(type: string, credentials: Register): Observable<any> {
    const route = (type === 'login') ? '/users/login' : '/users';
    return this.apiService.post(route , credentials).pipe(
      map((data) => {
        this.setAuth(data.user);
        return data;
      })
    );
  }
}
