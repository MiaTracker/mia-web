import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {AppConfig} from "../config/app.config";
import {IUserLogin} from "../interfaces/iuser-login.model";
import {HttpService} from "./http.service";
import {UserToken} from "../models/user-token";

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
}
