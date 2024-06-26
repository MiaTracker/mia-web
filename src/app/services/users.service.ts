import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {AppConfig} from "../config/app.config";
import {IUserLogin} from "../interfaces/iuser-login.model";
import {HttpService} from "./http.service";
import {UserToken} from "../models/user-token";
import {UserProfile} from "../models/user-profile";
import {UserRegistration} from "../models/user-registration";
import {UserIndex} from "../models/user-index";
import {PasswordChange} from "../models/password-change";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpService: HttpService) { }

  public login(login: IUserLogin): Observable<void> {
    return this.httpService.postObj(UserToken, '/users/login', null, login, false, true).pipe(map(data => {
      AppConfig.run.setToken(data);
    }));
  }

  public profile(): Observable<UserProfile> {
    return this.httpService.getObj(UserProfile, '/users/profile');
  }

  public index(): Observable<UserIndex[]> {
    return this.httpService.getArr(UserProfile, '/users');
  }

  public register(registration: UserRegistration): Observable<Object> {
    return this.httpService.post('/users/register', null, registration);
  }

  public changePassword(obj: PasswordChange): Observable<Object> {
    return this.httpService.patch('/users/password', null, obj, true);
  }

  public delete(uuid: string): Observable<Object> {
    return this.httpService.delete(`/users/${uuid}`);
  }
}
