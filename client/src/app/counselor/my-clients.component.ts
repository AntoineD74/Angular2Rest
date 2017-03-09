import { Component, OnInit } from '@angular/core';
import{ UserService } from '../services/user.service';
import{ AccountsService } from '../services/accounts.service';
import{ AuthenticationService } from '../services/authentication.service';
import { Http, Response, Headers } from '@angular/http';

import { User } from '../models/user';

@Component({
  moduleId: module.id,
  selector: 'my-clients',
  templateUrl: './my-clients.component.html',
})

export class MyClientsComponent implements OnInit {
  constructor (
      private usrService: UserService,
      private accService: AccountsService,
      private authService: AuthenticationService
    )
    {

    }

  users: User[];

  getAccounts(id){
    console.log("Init MyClients Component");
    let that = this;
    this.accService.getAccounts(id)
      .subscribe
      (
        function(response){
          if(response.Error){
            console.log(response.Code);
            if(response.Code == "JWT_EXPIRED"){
              that.authService.logout();
            }
          }else{
            console.log(response.Accounts);
            /*that.users = [];
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
            console.log(that.users);*/
          }
        }
      );
  }

  ngOnInit(){
    console.log("Init MyClients Component");
    let that = this;
    this.usrService.getMyClients()
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
              that.users[usr].mail = response.Users[usr].usr_mail;
              that.users[usr].addr = response.Users[usr].usr_addr;
              that.users[usr].postalcode = response.Users[usr].usr_postalcode;
              console.log(that.users[usr]);
            }
            console.log(that.users);
          }
        }
      );
  }
}
