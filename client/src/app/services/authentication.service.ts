import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'

import {Signin} from '../models/signin';

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http, private router: Router) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    isLoggedIn() :boolean{
      if (localStorage.getItem('currentUser')) {
          // logged in so return true
          return true;
      }
      return false;
    }

    login(signin:Signin) {
        let headers = new Headers();
          headers.append('Content-Type', 'application/json');
        let body = JSON.stringify(signin);
        return this.http.post('http://localhost:3000/api/authenticate', body, {headers : headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                if(!response.json().Error){
                  let token = response.json() && response.json().Token;
                  if (token) {
                      // set token property
                      this.token = token;

                      // store username and jwt token in local storage to keep user logged in between page refreshes
                      localStorage.setItem('currentUser', JSON.stringify({ mail: signin.mail, token: token }));
                    }
                }
                return response;
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
        this.router.navigate(['/home']);
    }
}
