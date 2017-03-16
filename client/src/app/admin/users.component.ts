import { Component, OnInit } from '@angular/core';
import{ UserService } from '../services/user.service';
import{ AuthenticationService } from '../services/authentication.service';
import { Http, Response, Headers } from '@angular/http';
import { MdDialog, MdDialogRef } from '@angular/material';

import { User } from '../models/user';

@Component({
  moduleId: module.id,
  selector: 'users',
  templateUrl: './users.component.html',
})

export class UsersComponent implements OnInit {
  constructor (
      private usrService: UserService,
      private authService: AuthenticationService,
      public dialog: MdDialog
    )
    {

    }

  users: User[];

  ngOnInit(){
    console.log("Init Users Component");
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
            console.log(response);
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
              that.users[usr].role = response.Users[usr].usr_role;
              console.log(that.users[usr]);
            }
            console.log(that.users);
          }
        }
      );
  }

  associateUsers(){
    this.dialog.open(AssociateUserDialog, {width : '500px'});
  }
}

@Component({
  moduleId: module.id,
  selector: 'associate-user-dialog',
  templateUrl: './associate-user-dialog.component.html',
})

export class AssociateUserDialog implements OnInit
{
  constructor(
    public dialogRef: MdDialogRef<AssociateUserDialog>,
    private usrService: UserService
  ){}

  usrInputCsl="";
  usrInputCli="";
  cslId = -1;
  cliId = -1;
  users : User[];
  filteredClients : User[];
  filteredCounselors : User[];

  selectCounselor(id){
    this.cslId = id;
  }

  selectClient(id){
    this.cliId = id;
  }

  filterCounselors(newValue){
    this.filteredCounselors = [];
    let regexp = new RegExp(newValue);
    for(let usr in this.users){
      if(regexp.test(this.users[usr].name+" "+this.users[usr].firstname) && this.users[usr].role > 0){
        this.filteredCounselors.push(this.users[usr]);
      }
    }
    this.cslId = -1;
  }

  filterClients(newValue){
    this.filteredClients = [];
    let regexp = new RegExp(newValue);
    for(let usr in this.users){
      if(regexp.test(this.users[usr].name+" "+this.users[usr].firstname) && this.users[usr].role == 0){
        this.filteredClients.push(this.users[usr]);
      }
    }
    this.cliId = -1;
  }

  onSubmit(){
    let that = this;
    if(this.cliId != -1 && this.cslId != -1){
      console.log({"cliId" : this.cliId, "cslId" : this.cslId});
      this.usrService.associate({"cliId" : this.cliId, "cslId" : this.cslId})
        .subscribe(
          function(response){
            if(!response.Error){
              that.dialogRef.close();
            }
          }
        )
    }
  }

  ngOnInit(){
    console.log("Init Association Dialog");
    let that = this;

    this.usrService.getAllUsers()
      .subscribe
      (
        function(response){
          console.log(response);
          if(!response.Error){
            that.users = [];
            for(var usr in response.Users){
              console.log(usr);
                that.users.push(new User('','','','','','','','',0,0));
                that.users[usr].id = response.Users[usr].usr_id;
                that.users[usr].firstname = response.Users[usr].usr_firstname;
                that.users[usr].name = response.Users[usr].usr_name;
                that.users[usr].role = response.Users[usr].usr_role;
            }
            that.filterCounselors("");
            that.filterClients("");
        }
      }
    );
  }
}
