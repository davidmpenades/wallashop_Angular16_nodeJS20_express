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
  
  currentUser?: User; // Almacena los datos del usuario actual
  constructor(private userService: UserService, private router: Router) {}// Inyección de dependencias

  ngOnInit() {
    this.userService.currentUser.subscribe((userData) => {// Recoge los datos del usuario actual
      this.currentUser = userData;// Almacena los datos del usuario actual
    });
  }

  logout(){
    this.userService.purgeAuth()
    window.location.reload();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    })
    
  }
}
