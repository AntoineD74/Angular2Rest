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
  nbactions = 0;

  constructor
    (
      public dialog: MdDialog,
      private accService: AccountsService
    ){}

  newOperation(id){
    let dialogref = this.dialog.open(NewOperationDialog, {width : '500px', data : { "id" : id } });
    dialogref.afterClosed().subscribe(result => {
      //this.selectedOption = result;
      window.location.reload();
    });
  }

  buyActions(){
    let that = this;
    if(this.account.type == 1){
      if(this.nbactions * 10 < this.account.solde && this.nbactions > 0){
        let ope = new Operation(-1, "", this.nbactions * 10, -1,this.account.id, "Achat d'actions");
        this.accService.buyActions(ope)
          .subscribe(
            function(response){
              if(!response.Error){
                window.location.reload();
              }
            }
          );
      }
    }
  }
}

@Component({
  moduleId: module.id,
  selector: 'new-operation-dialog',
  templateUrl: './new-operation-dialog.component.html',
})
export class NewOperationDialog implements OnInit
{
  constructor(
    public dialogRef: MdDialogRef<NewOperationDialog>,
    private accService: AccountsService
  ){}

  accounts: SearchAccount[];
  filteredAccounts: SearchAccount[];

  newOperation: Operation;

  selectedid = -1;
  usrInput="";

  selectAccount(id){
    this.selectedid = id;
    console.log("Compte sélectionné id "+id);
  }

  filterAccs(newValue){
    console.log("Filter ON");
    this.filteredAccounts = [];
    let regexp = new RegExp(newValue);
    for(let acc in this.accounts){
      if(regexp.test(this.accounts[acc].getString()) && this.accounts[acc].id != this.dialogRef.config.data.id){
        this.filteredAccounts.push(this.accounts[acc]);
      }
    }
    this.selectedid = -1;
    console.log(this.filteredAccounts);
  }

  onSubmit(){
    let error = false;
    let that = this;
    console.log("Submitting transaction");
    console.log(this.newOperation);
    if(this.selectedid != -1){
      this.newOperation.idcred = this.selectedid;
      if(this.newOperation.montant > 0 && this.selectedid != -1){
      console.log(this.newOperation);
        this.accService.addTransaction(this.newOperation)
          .subscribe(
            function(response){
              if(!response.Error){
                that.dialogRef.close(that.newOperation);
              }
            }
          );
      }
    }

  }

  ngOnInit(){
    console.log("Init Operation Dialog");
    console.log(this.dialogRef.config.data.id);
    let that = this;
    this.newOperation = new Operation(-1,"",0,-1,this.dialogRef.config.data.id,"");
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
            that.filterAccs("");
          }
        }
      )
  }
}
