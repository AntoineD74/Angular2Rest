import { Component, OnInit } from '@angular/core';
import{ AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
  constructor (
      private authService: AuthenticationService
    )
    {}

  ngOnInit(): void {

  }
  isLoggedIn = function(){
    return this.authService.isLoggedIn();
  }
}
