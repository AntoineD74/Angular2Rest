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

  accounts:Account[];

  ngOnInit(): void {
    console.log("Init Accounts Component");
    let that = this;
    this.accService.getMyAccounts().subscribe(
      function(response){
        if(response.Error){
          console.log(response.Code);
          if(response.Code == "JWT_EXPIRED"){
            that.authService.logout();
          }
        }else{
          console.log(response.Accounts);
          that.accounts = [];
          for(var acc in response.Accounts){
            console.log(acc);
            that.accounts.push(new Account(0,'',0,0,0));
            that.accounts[acc].id = response.Accounts[acc].acc_id;
            that.accounts[acc].date = response.Accounts[acc].acc_date;
            that.accounts[acc].solde = response.Accounts[acc].acc_solde;
            that.accounts[acc].actions = response.Accounts[acc].acc_actions;
            that.accounts[acc].type = response.Accounts[acc].acc_type;
            console.log(that.accounts[acc]);
          }
          console.log(that.accounts);
        }
      }
    );
  }
}
