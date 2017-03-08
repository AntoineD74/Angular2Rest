import { Component, OnInit } from '@angular/core';
import{ UserService } from '../services/user.service';
import{ AuthenticationService } from '../services/authentication.service';
import { Http, Response, Headers } from '@angular/http';

import { User } from '../models/user';

@Component({
  moduleId: module.id,
  selector: 'my-profile',
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
  constructor (
      private userService: UserService,
      private authService: AuthenticationService
    )
    {}
  user = new User('','','','','','','','',0,0);

  ngOnInit(): void {
    let that = this;
    this.userService.getMyProfile().subscribe(
      function(response){
        if(response.Error){
          console.log(response.Code);
          if(response.Code == "JWT_EXPIRED"){
            that.authService.logout();
          }
        }else{
          console.log(response.Users[0]);
          that.user.mail = response.Users[0].usr_mail;
          that.user.pwd = response.Users[0].usr_pwd;
          that.user.name = response.Users[0].usr_name;
          that.user.firstname = response.Users[0].usr_firstname;
          that.user.addr = response.Users[0].usr_addr;
          that.user.city = response.Users[0].usr_city;
          that.user.postalcode = response.Users[0].usr_postalcode;
          that.user.phone = response.Users[0].usr_phone;
        }
      }
    )
  }
}
