import { Component, OnInit } from '@angular/core';
import { UserService } from '../core';
import { User } from '../core/model/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user!: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    if (this.route.snapshot.paramMap.get('id')) {
      console.log(this.route.snapshot.paramMap.get('id')!);
      
    this.userService.getUserById(this.route.snapshot.paramMap.get('id')!).subscribe((data) => {
      console.log(data);
      this.user = data;

    })
    }else{
      this.userService.currentUser.subscribe((data) => {
        this.user = data;
      });
    }
  }
}
