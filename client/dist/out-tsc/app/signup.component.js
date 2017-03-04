var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from './user.service';
var SignUpComponent = (function () {
    function SignUpComponent(userService) {
        this.userService = userService;
        this.userForm = new FormGroup({
            username: new FormControl(),
            pwd: new FormControl()
        });
        this.onSubmit = function () {
            this.userService.addUser(this.userForm.get('username').value, this.userForm.get('pwd').value);
        };
    }
    SignUpComponent.prototype.ngOnInit = function () {
    };
    return SignUpComponent;
}());
SignUpComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'my-signup',
        templateUrl: './signup.component.html',
    }),
    __metadata("design:paramtypes", [UserService])
], SignUpComponent);
export { SignUpComponent };
//# sourceMappingURL=../../../src/app/signup.component.js.map