import { Component, OnInit } from '@angular/core';
import { UserService } from '../core';
import { Follower, User } from '../core/model/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  currentUser: User = {} as User;
  itsMe: boolean = false;
  pageActive: string = 'followers'
  idRoute: string = this.route.snapshot.paramMap.get('id')!

  followers: Follower[] = [];
  followings: Follower[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userService.currentUser.subscribe((userData) => {
      if (this.idRoute === userData._id || !this.idRoute) {
        this.itsMe = true
      }
      this.currentUser = userData;
    });

    this.getUser(this.idRoute);
    this.getFollowers(this.idRoute)
    this.getFollowings(this.idRoute)
  }

  getUser(id: string) {
    if (id) {
      this.userService.getUserById(id).subscribe((data) => {
        console.log(data);
        this.user = data;
      })
    } else {
      this.userService.currentUser.subscribe((data) => {
        this.user = data;
      });
    }
  }

  getFollowers(id: string){
    if (id) {
      this.userService.getUsersFollowers(id).subscribe((data) => {
        console.log(data);
        this.followers = data
      })
    } else {
      this.userService.getUsersFollowers(this.user._id).subscribe((data) => {
        console.log(data);
        this.followers = data
      })
    }
  }

  getFollowings(id: string){
    if (id) {
      this.userService.getUsersFollowings(id).subscribe((data) => {
        console.log(data);
        this.followings = data
      })
    } else {
      this.userService.getUsersFollowings(this.user._id).subscribe((data) => {
        console.log(data);
        this.followings = data
      })
    }
  }

  follow(event: any) {
    if(event) {
      this.user.countFollowers++
    } else {
      this.user.countFollowers--
    }
  }

}
