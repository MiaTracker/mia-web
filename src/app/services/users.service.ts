import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {AppConfig} from "../config/app.config";
import {IUserLogin} from "../interfaces/iuser-login.model";
import {HttpService} from "./http.service";
import {UserToken} from "../models/user-token";
import {UserProfile} from "../models/user-profile";
import {UserRegistration} from "../models/user-registration";
import {UserIndex} from "../models/user-index";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpService: HttpService) { }

  public login(login: IUserLogin): Observable<void> {
    return this.httpService.postObj(UserToken, '/users/login', null, login, true).pipe(map(data => {
      localStorage.setItem('token', JSON.stringify(data));
      AppConfig.run.token = data.token;
      AppConfig.run.token_expiry = data.expiry_date;
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
}
