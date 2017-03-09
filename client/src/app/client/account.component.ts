import { Component, OnInit, Input } from '@angular/core';
import { Account, Operation, SearchAccount } from '../models/account';
import { MdDialog, MdDialogRef } from '@angular/material';

import { AccountsService } from '../services/accounts.service';

@Component({
  moduleId: module.id,
  selector: 'my-account',
  templateUrl: './account.component.html',
})

export class AccountComponent{
  @Input()
  account:  Account;
  constructor
    (
      public dialog: MdDialog
    ){}

  newOperation(id){
    this.dialog.open(NewOperationDialog, {width : '500px', data : { "id" : id } });
  }
}

@Component({
  moduleId: module.id,
  selector: 'new-operation-dialog',
  templateUrl: './new-operation-dialog.component.html',
})
export class NewOperationDialog implements OnInit
{
  constructor(public dialogRef: MdDialogRef<NewOperationDialog>, private accService: AccountsService){}

  accounts: SearchAccount[];
  filteredAccounts: SearchAccount[];

  selectedid;

  selectAccount(id){
    this.selectedid = id;
    console.log("Compte sélectionné id "+id);
  }

  ngOnInit(){
    console.log("Init Operation Dialog");
    console.log(this.dialogRef.config.data.id);
    let that = this;
    this.accService.searchAccounts()
      .subscribe
      (
        function(response){
          console.log(response);
          if(!response.Error){
            that.accounts = [];
            for(var acc in response.Accounts){
              that.accounts.push(new SearchAccount(0,'','',0));
              that.accounts[acc].name = response.Accounts[acc].usr_name;
              that.accounts[acc].firstname = response.Accounts[acc].usr_firstname;
              that.accounts[acc].type = response.Accounts[acc].acc_type;
              that.accounts[acc].id = response.Accounts[acc].acc_id;
            }
          }
        }
      )
  }
}
