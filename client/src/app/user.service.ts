import { Injectable }              from '@angular/core';
import { Http, Response, Headers }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {
  private heroesUrl = 'app/heroes';  // URL to web API
  constructor (private http: Http) {}
  /*getHeroes (): Observable<Hero[]> {
    return this.http.get(this.heroesUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }*/

  addUser(username: string, pwd: string){
    let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let body = `username=${username}&pwd=${pwd}`;
    console.log("Trying to send post request to server");
    console.log(body);
    return this.http.post('http://localhost:3000/api/users', body, {headers : headers})
                    .map(this.extractData)
                    .catch(this.handleError).subscribe();
  }

  testUser(){
    console.log("Test Api");
    return this.http.get("http://localhost:3000/api/users")
                    .map(this.extractData)
                    .catch(this.handleError)
                    .subscribe();
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log("extracted "+body);
    return body.data || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }
}
