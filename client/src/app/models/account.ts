export class Operation {
  constructor(
    public id: number,
    public date: string,
    public montant: number,
    public idcred: number,
    public iddeb: number
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
