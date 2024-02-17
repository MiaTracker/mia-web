import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpService} from "./http.service";
import { AppToken } from '../models/app-token';
import {AppTokenIndex} from "../models/app-token-index";

@Injectable({
  providedIn: 'root'
})
export class AppTokensService {

  constructor(private httpService: HttpService) { }

  public generate(name: string): Observable<AppToken> {
    return this.httpService.postObj(AppToken, '/app_tokens', null, { name: name });
  }

  public index(): Observable<AppTokenIndex[]> {
    return this.httpService.getArr(AppTokenIndex, '/app_tokens');
  }

  public revoke(name: string): Observable<Object> {
    return this.httpService.delete(`/app_tokens/${name}`);
  }
}
