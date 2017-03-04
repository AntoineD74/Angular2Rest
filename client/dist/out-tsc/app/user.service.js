var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.heroesUrl = 'app/heroes';
    }
    UserService.prototype.addUser = function (username, pwd) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var body = "username=" + username + "&pwd=" + pwd;
        console.log("Trying to send post request to server");
        console.log(body);
        return this.http.post('http://localhost:3000/api/users', body, { headers: headers })
            .map(this.extractData)
            .catch(this.handleError).subscribe();
    };
    UserService.prototype.testUser = function () {
        console.log("Test Api");
        return this.http.get("http://localhost:3000/api/users")
            .map(this.extractData)
            .catch(this.handleError)
            .subscribe();
    };
    UserService.prototype.extractData = function (res) {
        var body = res.json();
        console.log("extracted " + body);
        return body.data || {};
    };
    UserService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return Observable.throw(errMsg);
    };
    return UserService;
}());
UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], UserService);
export { UserService };
//# sourceMappingURL=../../../src/app/user.service.js.map