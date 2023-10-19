import { Component, OnInit } from '@angular/core';
import { UserService } from '../core';
import { User } from '../core/model/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User

  constructor( private userService: UserService) {}

  ngOnInit() {
    this.getUser()
  }

  getUser(){
    this.userService.currentUser.subscribe(
       (data) => {
        this.user = data
      }
    )
  }

}
