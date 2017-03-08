import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Account } from '../models/account';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AccountsService {
  private accountsUrl = 'http://localhost:3000/api/accounts';  // URL to web API
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
}
