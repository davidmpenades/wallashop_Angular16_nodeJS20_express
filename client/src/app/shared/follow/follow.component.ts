import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/core';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.scss']
})
export class FollowComponent implements OnInit {
  @Input() followed: boolean = false;

  constructor(
    private userService: UserService,
  ) { }

  

  ngOnInit() {
  }
 followUser(){

  }
}
