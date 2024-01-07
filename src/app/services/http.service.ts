import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../config/app.config";
import {Deserializable} from "../interfaces/deserializable.interface";
import {catchError, map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private client: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  public getArr<T extends Deserializable>(type: { new(): T ;}, url: string, params: Object | null = null) {
    return this.client.get<T[]>(AppConfig.env.api.url + url +this.paramsString(params), { headers: this.headers() })
        .pipe(map(data => data.map(data => new type().deserialize(data))), catchError((err, _) => {
          this.handleErrors(err);
          throw err;
        }));
  }

  public getObj<T extends Deserializable>(type: { new(): T ;}, url: string, params: Object | null = null) {
    return this.client.get<T>(AppConfig.env.api.url + url + this.paramsString(params), { headers: this.headers() })
      .pipe(map(data => new type().deserialize(data)), catchError((err, _) => {
        this.handleErrors(err);
        throw err;
      }));
  }

  public post(url: string, params: Object | null = null, body: any = null): Observable<Object> {
    return this.client.post(AppConfig.env.api.url + url + this.paramsString(params), body, { headers: this.headers() }).pipe(catchError((err, _) => {
      this.handleErrors(err);
      throw err;
    }));
  }

  public postObj<T extends Deserializable>(type: { new(): T ;}, url: string, params: Object | null = null, body: any = null, isLogin: boolean = false) : Observable<T> {
    return this.client.post<T>(AppConfig.env.api.url + url + this.paramsString(params), body, { headers: this.headers() })
      .pipe(map(data => new type().deserialize(data)), catchError((err, _) => {
        this.handleErrors(err, isLogin);
        throw err;
      }));
  }

  public patch(url: string, params: Object | null = null, body: any = null): Observable<Object> {
    return this.client.patch(AppConfig.env.api.url + url + this.paramsString(params), body, { headers: this.headers() }).pipe(catchError((err, _) => {
      this.handleErrors(err);
      throw err;
    }))
  }

  public delete(url: string): Observable<Object> {
    return this.client.delete(AppConfig.env.api.url + url, { headers: this.headers() }).pipe(catchError((err, _) => {
      this.handleErrors(err);
      throw err;
    }));
  }

  private paramsString(params: any | null): string {
    if(params == null) return "";
    let str = "?";
    for (const param in params) {
      str += `${param}=${params[param]}&`
    }
    if(str.length == 1) return "";
    return str.slice(0, -1);
  }

  private headers() {
    let headers = AppConfig.const.apiHeaders;
    headers = headers.set('Authorization', `Bearer ${AppConfig.run.token}`);
    return headers;
  }

  private handleErrors(err: any, isLogin: boolean = false) {
    if(err.status == 401 && !isLogin) this.router.navigateByUrl('/login');
    else {
      this.snackBar.open("An error occurred while talking to the server!", undefined, { duration: 3000 })
    }
  }
}
