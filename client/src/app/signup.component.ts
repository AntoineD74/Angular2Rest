import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { UserService } from './user.service';

@Component({
  moduleId: module.id,
  selector: 'my-signup',
  templateUrl: './signup.component.html',
})

export class SignUpComponent implements OnInit {
  constructor (private userService: UserService){}
  ngOnInit(): void {

  }

  userForm = new FormGroup({
    username: new FormControl(),
    pwd: new FormControl()
  });

  onSubmit = function(){
    this.userService.addUser(this.userForm.get('username').value, this.userForm.get('pwd').value);
  }
}
