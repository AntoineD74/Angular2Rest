import { Component, OnInit } from '@angular/core';
import{ UserService } from '../services/user.service';
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
      private authService: AuthenticationService
    )
    {

    }

  clients: User[];

  ngOnInit(){
    this.usrService.getMyClients()
      .subscribe
      (
        function(response){
          console.log(response);
        }
      );
  }
}
