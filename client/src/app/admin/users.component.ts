import { Component, OnInit } from '@angular/core';
import{ UserService } from '../services/user.service';
import{ AuthenticationService } from '../services/authentication.service';
import { Http, Response, Headers } from '@angular/http';

import { User } from '../models/user';

@Component({
  moduleId: module.id,
  selector: 'users',
  templateUrl: './users.component.html',
})

export class UsersComponent implements OnInit {
  constructor (
      private usrService: UserService,
      private authService: AuthenticationService
    )
    {

    }

  users: User[];

  ngOnInit(){
    this.usrService.getAllUsers()
      .subscribe
      (
        function(response){
          console.log(response);
        }
      );
  }
}
