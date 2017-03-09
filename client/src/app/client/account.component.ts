import { Component, OnInit, Input } from '@angular/core';
import { Account, Operation } from '../models/account';

@Component({
  moduleId: module.id,
  selector: 'my-account',
  templateUrl: './account.component.html',
})
 
export class AccountComponent{
  @Input()
  account:  Account;

  addNewTransaction(){

  }
}
