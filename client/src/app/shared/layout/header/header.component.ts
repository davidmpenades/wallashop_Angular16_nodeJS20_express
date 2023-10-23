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
  
  currentUser?: User; // Propiedad para almacenar los datos del usuario actual
 // Inyecta el servicio UserService en el componente
  constructor(private userService: UserService, private router: Router) {}

  // Método que se ejecuta al iniciar el componente     
  ngOnInit() {
    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;// Almacena los datos del usuario actual
    });
  }

  logout(){
    this.userService.purgeAuth()
    this.router.navigate(['/'])
  }
}
