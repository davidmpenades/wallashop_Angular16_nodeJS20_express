import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core';
import { Follower } from 'src/app/core/model/user.model';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss']
})
export class CardUserComponent {

  @Input() data: Follower = {} as Follower
  itsMe: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(){
    this.userService.currentUser.subscribe((userData) => {
      if (this.data._id === userData._id) {
        this.itsMe = true
      }
    });
  }

  goToProfile(id: string) {
    this.router.navigate(['/profile/' + id]).then(() => {
      window.location.reload()
    })
  }

  follow(event: any) {
    if(event) {
      this.data.countFollowers++
    } else {
      this.data.countFollowers--
    }
  }

}
