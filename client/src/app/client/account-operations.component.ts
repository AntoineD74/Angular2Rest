import { Component, OnInit, Input } from '@angular/core';
import { Operation } from '../models/account';

import { AccountsService } from '../services/accounts.service';

@Component({
  moduleId: module.id,
  selector: 'account-operations',
  templateUrl: './account-operations.component.html',
})

export class AccountOperationsComponent implements OnInit{
  @Input()
  accid:number;

  operations:  Operation[];

  constructor
    (
      private accService: AccountsService
    ){}

    ngOnInit(){
      let that = this;
      this.accService.getOperations(this.accid)
        .subscribe(
          function(response){
            if(!response.Error){
              that.operations = []
              console.log(response.Operations);
              for(var ope in response.Operations){
                that.operations.push(new Operation(-1, "", 0, -1, -1, ""));
                that.operations[ope].id = response.Operations[ope].ope_id;
                that.operations[ope].date = response.Operations[ope].ope_date;
                that.operations[ope].montant = response.Operations[ope].ope_montant;
                that.operations[ope].idcred = response.Operations[ope].acc_id_cred;
                that.operations[ope].iddeb = response.Operations[ope].acc_id_deb;
                that.operations[ope].libelle = response.Operations[ope].ope_desc;
              }
            }
          }
        )
    }

}
