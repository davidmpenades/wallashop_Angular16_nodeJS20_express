import { Component } from '@angular/core';
import { UserService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wallashop';

  constructor(private userService: UserService) {}
  
  ngOnInit(){
    this.userService.populate();
  }
}
