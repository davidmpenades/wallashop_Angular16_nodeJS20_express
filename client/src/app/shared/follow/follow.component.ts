import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core';
import { User } from 'src/app/core/model/user.model';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit {
  user: User = {} as User;
  @Input() followed: boolean = false;
  @Input() idFollower: string = "";
  @Output() follow = new EventEmitter<boolean>();

  constructor(
    private userService: UserService,
    private router: Router
  ) { }



  ngOnInit() {
  }
  followUser() {
    this.user = this.userService.getCurrentUser();
    if (Object.entries(this.user).length !== 0) {
      this.userService.follow(this.idFollower).subscribe((data) => {
        this.followed = !this.followed
        if (this.followed) {
          this.follow.emit(true)
        } else {
          this.follow.emit(false)
        }
      })
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
