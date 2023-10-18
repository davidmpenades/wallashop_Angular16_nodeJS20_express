import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core';
import { User } from 'src/app/core/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  
  currentUser?: User;// Declara una propiedad currentUser que puede ser un objeto User o undefined

  // Constructor del componente que recibe una instancia de UserService
  constructor(private userService: UserService, private router: Router) {}

  // Se suscribe a cambios en el usuario actual a través del servicio UserService      
  ngOnInit() {
    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;// Actualiza la propiedad currentUser con los datos del usuario actual
    });
  }

  logout(){
    this.userService.purgeAuth()
    this.router.navigate(['/'])
  }
}
