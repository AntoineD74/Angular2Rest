import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { UserService } from './user.service';

@Component({
  moduleId: module.id,
  selector: 'my-signin',
  templateUrl: './signin.component.html',
})

export class SignInComponent {
  constructor (private userService: UserService){}

  userForm = new FormGroup({
    username: new FormControl(),
    pwd: new FormControl()
  });

  onSubmit = function(){
    this.userService.testUser();
  }
}
