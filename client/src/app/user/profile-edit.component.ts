import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Http, Response, Headers } from '@angular/http';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-profile-edit',
  templateUrl: './profile-edit.component.html'
})

export class ProfileEditComponent implements OnInit {
  constructor
    (
      private userService: UserService,
      public dialog: MdDialog
    ){}
  user = new User('','','','','','','','',0,0);
  errServer: boolean = false;
  usrExists: boolean = false;
  onSubmit(){
    let that = this;
    this.userService
      .updateMyProfile(this.user)
      .subscribe(
        function(response) {
          console.log(response);
          that.errServer = false;
          if(response.Error){
            that.usrExists = true;
            console.log("Error mail exists");
          }else{
            console.log("User updated");
            that.usrExists = false;
            that.openDialog();
          }
        },
        function(error) {
          console.log("Error happened" + error);
          that.errServer = true;
        },
        function() { console.log("the subscription is completed")}
      );
  }
  ngOnInit(): void {
    let that = this;
    this.userService.getMyProfile().subscribe(
      function(response){
        if(response.Error){
          console.log(response.Code);
          if(response.Code == "JWT_EXPIRED"){
            //that.authService.logout();
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
          that.user.phone = '0'+response.Users[0].usr_phone;
          that.user.id = response.Users[0].usr_id;
        }
      }
    );
  }
  openDialog(){
    this.dialog.open(ProfileEditDialog);
  }
}

@Component({
  moduleId: module.id,
  selector: 'profile-edit-dialog',
  templateUrl: './profile-edit-dialog.component.html',
})
export class ProfileEditDialog
{
  constructor(private router: Router,public dialogRef: MdDialogRef<ProfileEditDialog>){}
  onClick(){
    this.router.navigate(['/profile']);
  }
}
