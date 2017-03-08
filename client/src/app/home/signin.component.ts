import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';

import{ AuthenticationService } from '../services/authentication.service';

import { Signin } from '../models/signin';

@Component({
  moduleId: module.id,
  selector: 'my-signin',
  templateUrl: './signin.component.html',
})

export class SignInComponent {
  constructor (
      private router: Router,
      private authService: AuthenticationService
    )
    {}

  errServer: boolean = false;
  wrgPwd: boolean = false;
  mailExists: boolean = true;

  signin = new Signin('','');

  onSubmit = function(){
    let that = this;
    that.errServer = false;
    that.wrgPwd = false;
    that.mailExists = true;
    this.authService
      .login(this.signin)
      .subscribe(
        function(response) {
          if(response.json().Error){
            console.log("Erreur lors de l'authentification");
            if(response.json().Code == "USR_NOT_FOUND"){
              console.log("Mail inconnu");
              that.mailExists = false;
            }else if(response.json().Code == "PWD_FAILED"){
              console.log("Mauvais mot de passe");
              that.wrgPwd = true;
            }
          }else{
            console.log("User authentifié");
            that.router.navigate(['/home']);
          }
        },
        function(error)
        {
          console.log("Error happened" + error)
          that.errServer = true;
        },
        function() { console.log("the subscription is completed")}
      );
  }
}
