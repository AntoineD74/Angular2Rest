import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from '../models/user';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class UserService {

  private usersUrl = 'http://localhost:3000/api/users';  // URL to web API
  private clientsUrl = 'http://localhost:3000/api/clients';  // URL to web API
  constructor (
    private http: Http,
    private authService: AuthenticationService
  ) {}

  getMyRole(){
    let headers = new Headers({ 'Authorization': this.authService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.usersUrl+'/profile/role', options)
            .map((response: Response) => response.json());
  }

  getMyProfile(){
    let headers = new Headers({ 'Authorization': this.authService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.usersUrl+'/profile', options)
            .map((response: Response) => response.json());
  }

  getMyClients(){
    let headers = new Headers({ 'Authorization': this.authService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.clientsUrl, options)
            .map((response: Response) => response.json());
  }

  getAllUsers(){
    let headers = new Headers({ 'Authorization': this.authService.token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.usersUrl+'/all', options)
            .map((response: Response) => response.json());
  }

  addNewUser(user:User){
    let headers = new Headers();
      headers.append('Content-Type', 'application/json');
    let body = JSON.stringify(user);
    console.log("Trying to send post request to server");
    console.log(body);
    return this.http.post('http://localhost:3000/api/users/create', body, {headers : headers})
                    .map(res => res.json());
  }

  updateMyProfile(user:User){
    let headers = new Headers({ 'Authorization': this.authService.token });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(user);
    return this.http.post('http://localhost:3000/api/users/update', body, {headers : headers})
                    .map(res => res.json());
  }

  associate(asso){
    let headers = new Headers({ 'Authorization': this.authService.token });
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(asso);
    return this.http.post('http://localhost:3000/api/associate', body, {headers : headers})
                    .map(res => res.json());
  }

}
