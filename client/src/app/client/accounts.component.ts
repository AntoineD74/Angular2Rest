import { Component, OnInit } from '@angular/core';
import{ AccountsService } from '../services/accounts.service';
import{ AuthenticationService } from '../services/authentication.service';
import { Http, Response, Headers } from '@angular/http';

import { Account, Operation } from '../models/account';

@Component({
  moduleId: module.id,
  selector: 'my-accounts',
  templateUrl: './accounts.component.html',
})

export class AccountsComponent implements OnInit {
  constructor (
      private accService: AccountsService,
      private authService: AuthenticationService
    )
    {}

  accounts = [new Account(0,'',0,0,0), new Account(0,'',0,0,0)];

  ngOnInit(): void {
    let that = this;
    this.accService.getMyAccounts().subscribe(
      function(response){
        if(response.Error){
          console.log(response.Code);
          if(response.Code == "JWT_EXPIRED"){
            that.authService.logout();
          }
        }else{
          that.accounts[0].id = response.Accounts[0].acc_id;
          that.accounts[0].date = response.Accounts[0].acc_date;
          that.accounts[0].solde = response.Accounts[0].acc_solde;
          that.accounts[0].actions = response.Accounts[0].acc_actions;
          that.accounts[0].type = response.Accounts[0].acc_type;

          that.accounts[1].id = response.Accounts[1].acc_id;
          that.accounts[1].date = response.Accounts[1].acc_date;
          that.accounts[1].solde = response.Accounts[1].acc_solde;
          that.accounts[1].actions = response.Accounts[1].acc_actions;
          that.accounts[1].type = response.Accounts[1].acc_type;
          console.log(that.accounts);
        }
      }
    )
  }
}
