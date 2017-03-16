import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Account, Operation } from '../models/account';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AccountsService {
  private accountsUrl = 'http://localhost:3000/api/accounts';  // URL to web API
  private opesUrl = 'http://localhost:3000/api/operations';  // URL to web API
  constructor (
    private http: Http,
    private authService: AuthenticationService
  ) {}

  getMyAccounts(){
    let headers = new Headers({ 'Authorization': this.authService.token });
    let options = new RequestOptions({ headers: headers });
    let that = this;
    return this.http.get(that.accountsUrl, options)
            .map((response: Response) => response.json());
  }

  getAccounts(id){
    let headers = new Headers({ 'Authorization': this.authService.token });
    let options = new RequestOptions({ headers: headers });
    let that = this;
    console.log(that.accountsUrl+'/'+id);
    return this.http.get(that.accountsUrl+'/'+id, options)
            .map((response: Response) => response.json());
  }

  addTransaction(ope:Operation){
    let headers = new Headers({ 'Authorization': this.authService.token });
    headers.append('Content-Type', 'application/json');
    let that = this;
    let body = JSON.stringify(ope);
    return this.http.post(that.opesUrl+'/new', body, {headers : headers})
            .map((response: Response) => response.json());
  }

  buyActions(ope:Operation){
    let headers = new Headers({ 'Authorization': this.authService.token });
    headers.append('Content-Type', 'application/json');
    let that = this;
    let body = JSON.stringify(ope);
    return this.http.post(that.opesUrl+'/actions', body, {headers : headers})
            .map((response: Response) => response.json());
  }

  getOperations(acc_id){
    let headers = new Headers({ 'Authorization': this.authService.token });
    let options = new RequestOptions({ headers: headers });
    let that = this;
    return this.http.get(that.opesUrl+'/'+acc_id, options)
            .map((response: Response) => response.json());
  }

  searchAccounts(){
    let headers = new Headers({ 'Authorization': this.authService.token });
    let options = new RequestOptions({ headers: headers });
    let that = this;
    return this.http.get(that.accountsUrl+'/all', options)
            .map((response: Response) => response.json());
  }
}
