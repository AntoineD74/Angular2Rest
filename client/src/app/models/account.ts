export class Operation {
  constructor(
    public id: number,
    public date: string,
    public montant: number,
    public idcred: number,
    public iddeb: number,
    public libelle:string
  ) {  }
}

export class Account {
  constructor(
    public id: number,
    public date: string,
    public solde: number,
    public actions: number,
    public type: number
  ) {  }
}

export class SearchAccount{
  constructor(
    public id: number,
    public name: string,
    public firstname: string,
    public type: number,
  ) {  }

  public getString():string{
    let str:string = "";
    str = this.name+' '+this.firstname+', ';
    if(this.type == 0){
      str += "Compte chèques";
    }else{
      str += "Livret A";
    }
    return str;
  }
}
