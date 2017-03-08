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
    console.log("Init Clients Component");
    let that = this;
    this.usrService.getAllUsers()
      .subscribe
      (
        function(response){
          if(response.Error){
            console.log(response.Code);
            if(response.Code == "JWT_EXPIRED"){
              that.authService.logout();
            }
          }else{
            console.log(response.Users);
            that.users = [];
            for(var usr in response.Users){
              console.log(usr);
              that.users.push(new User('','','','','','','','',0,0));
              that.users[usr].id = response.Users[usr].usr_id;
              that.users[usr].firstname = response.Users[usr].usr_firstname;
              that.users[usr].name = response.Users[usr].usr_name;
              that.users[usr].city = response.Users[usr].usr_city;
              that.users[usr].phone = response.Users[usr].usr_phone;
              console.log(that.users[usr]);
            }
            console.log(that.users);
          }
        }
      );
  }
}
