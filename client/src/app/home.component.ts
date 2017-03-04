import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
  ngOnInit(): void {

  }
  isLoggedIn = function(){
    return false;
  }
}
