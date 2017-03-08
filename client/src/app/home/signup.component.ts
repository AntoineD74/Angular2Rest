import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Http, Response, Headers } from '@angular/http';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-signup',
  templateUrl: './signup.component.html'
})

export class SignUpComponent {
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
      .addNewUser(this.user)
      .subscribe(
        function(response) {
          console.log(response);
          that.errServer = false;
          if(response.Error){
            that.usrExists = true;
            console.log("Error user exists");
          }else{
            console.log("User added");
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
  openDialog(){
    this.dialog.open(SignupDialog);
  }
}

@Component({
  moduleId: module.id,
  selector: 'signup-dialog',
  templateUrl: './signup-dialog.component.html',
})
export class SignupDialog
{
  constructor(private router: Router,public dialogRef: MdDialogRef<SignupDialog>){}
  onClick(){
    this.router.navigate(['/signin']);
  }
}
