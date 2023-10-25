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

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
  
  setAuth(data: any) {
    this.jwtService.saveToken(data.token);
    this.currentUserSubject.next(data);
    this.isAuthenticatedSubject.next(true);
  }
 
  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  attempAuth(type: string, credentials: Register): Observable<any> {
    const route = (type === 'login') ? '/users/login' : '/users';// Si el tipo es login, la ruta es /users/login, si no, es /users
    return this.apiService.post(route , credentials).pipe(// Hace una petición post a la ruta y con las credenciales
      map((data) => {
        this.setAuth(data.user);
        return data;
      })
    );
  }

  update(user:any): Observable<User> {
    return this.apiService
    .put('/user/update', { user })
    .pipe(map(data => {
      // Update the currentUser observable
      this.currentUserSubject.next(data.user);
      return data.user;
    }));
  }

  getUserById(id: string): Observable<User> {
    return this.apiService.getById('/user/profile/'+id)
  }
}
