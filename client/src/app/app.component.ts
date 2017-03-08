import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';

import{ AuthenticationService } from './services/authentication.service';
import{ UserService } from './services/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Bank Dashboard';
  constructor (
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ){
    let that = this;
    router.events.subscribe((val) => {
        // see also
        that.getMyRole();
    });
  }

  role = 0;
  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getMyRole(){
    let that = this;
    this.userService.getMyRole()
      .subscribe
        (
          function(response) {
            console.log(response);
            if(!response.Error){
              console.log(response.Role[0].usr_role);
              that.role = response.Role[0].usr_role;
            }else{
              that.role = -1;
            }
          },
          function(error){
            that.role = -1;
          }
        );
  }

  logOut(){
    this.authService.logout();
  }

  ngOnInit(){
    this.getMyRole();
  }
}
