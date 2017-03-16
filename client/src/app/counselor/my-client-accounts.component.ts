import { Component, OnInit } from '@angular/core';
import{ AccountsService } from '../services/accounts.service';
import{ AuthenticationService } from '../services/authentication.service';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { Account, Operation } from '../models/account';

@Component({
  moduleId: module.id,
  selector: 'my-client-accounts',
  templateUrl: './my-client-accounts.component.html',
})

export class MyClientAccountsComponent implements OnInit {
  constructor (
      private accService: AccountsService,
      private authService: AuthenticationService,
      private route: ActivatedRoute
    )
    {
      this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
      });
    }

  id:number;
  private sub: any;
  accounts:Account[];

  ngOnInit(): void {
    console.log("Init Accounts Component");
    let that = this;
    this.accService.getAccounts(this.id).subscribe(
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
