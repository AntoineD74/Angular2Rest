import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './home/signin.component';
import { SignUpComponent, SignupDialog } from './home/signup.component';

import { ProfileComponent } from './user/profile.component';
import { ProfileEditComponent, ProfileEditDialog } from './user/profile-edit.component';

import { AccountsComponent } from './client/accounts.component';
import { AccountComponent, NewOperationDialog } from './client/account.component';
import { AccountOperationsComponent } from './client/account-operations.component';

import { MyClientsComponent } from './counselor/my-clients.component';
import { MyClientAccountsComponent } from './counselor/my-client-accounts.component';

import { UsersComponent, AssociateUserDialog } from './admin/users.component';

import { UserService } from './services/user.service';
import { AccountsService } from './services/accounts.service';
import { AuthenticationService } from './services/authentication.service';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'profile/edit',
    component: ProfileEditComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'accounts',
    component: AccountsComponent
  },
  {
    path: 'client/accounts/:id',
    component: MyClientAccountsComponent
  },
  {
    path: 'clients',
    component: MyClientsComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    SignupDialog,
    ProfileComponent,
    ProfileEditComponent,
    ProfileEditDialog,
    AccountsComponent,
    AccountComponent,
    AccountOperationsComponent,
    NewOperationDialog,
    MyClientsComponent,
    MyClientAccountsComponent,
    UsersComponent,
    AssociateUserDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,
    AccountsService,
    AuthenticationService
  ],
  entryComponents: [
    SignupDialog,
    ProfileEditDialog,
    NewOperationDialog,
    AssociateUserDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
