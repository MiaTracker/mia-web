import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfig} from "../config/app.config";
import {Deserializable} from "../interfaces/deserializable.interface";
import {catchError, map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Globals} from "../infrastructure/globals";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private client: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  public getArr<T extends Deserializable>(type: { new(): T ;}, url: string, params: Object | null = null, paginate: boolean = false) {
    return this.client.get<T[]>(this.buildUrl(url, params, paginate), { headers: this.headers() })
        .pipe(map(data => data.map(data => new type().deserialize(data))), catchError((err, _) => {
          this.handleErrors(err);
          throw err;
        }));
  }

  public getStrArr(url: string, params: Object | null = null) {
    return this.client.get<string[]>(this.buildUrl(url, params), { headers: this.headers() })
      .pipe(catchError((err, _) => {
        this.handleErrors(err);
        throw err;
      }));
  }

  public getObj<T extends Deserializable>(type: { new(): T ;}, url: string, params: Object | null = null) {
    return this.client.get<T>(this.buildUrl(url, params), { headers: this.headers() })
      .pipe(map(data => new type().deserialize(data)), catchError((err, _) => {
        this.handleErrors(err);
        throw err;
      }));
  }

  public post(url: string, params: Object | null = null, body: any = null): Observable<Object> {
    return this.client.post(this.buildUrl(url, params), body, { headers: this.headers() }).pipe(catchError((err, _) => {
      this.handleErrors(err);
      throw err;
    }));
  }

  public postObj<T extends Deserializable>(type: { new(): T ;}, url: string, params: Object | null = null, body: any = null, paginate: boolean = false, isLogin: boolean = false) : Observable<T> {
    return this.client.post<T>(this.buildUrl(url, params, paginate), body, { headers: this.headers() })
      .pipe(map(data => new type().deserialize(data)), catchError((err, _) => {
        this.handleErrors(err, isLogin);
        throw err;
      }));
  }

  public patch(url: string, params: Object | null = null, body: any = null, isUnauthorizedExpected = false): Observable<Object> {
    return this.client.patch(this.buildUrl(url, params), body, { headers: this.headers() }).pipe(catchError((err, _) => {
      this.handleErrors(err, isUnauthorizedExpected);
      throw err;
    }))
  }

  public delete(url: string): Observable<Object> {
    return this.client.delete(this.buildUrl(url), { headers: this.headers() }).pipe(catchError((err, _) => {
      this.handleErrors(err);
      throw err;
    }));
  }

  public ping(base_url: string): Observable<Object> {
    return this.client.get(base_url + "/ping");
  }

  private paramsString(params: any | null, paginate: boolean = false): string {
    if(paginate) {
      if(params == null) {
        params = { offset: Globals.SearchCurrentPage * AppConfig.env.api.pageSize, limit: AppConfig.env.api.pageSize }
      } else {
        (params as any)['offset'] = Globals.SearchCurrentPage * AppConfig.env.api.pageSize;
        (params as any)['limit'] = AppConfig.env.api.pageSize;
      }
    }
    if(params == null) return "";
    let str = "?";
    for (const param in params) {
      str += `${param}=${params[param]}&`
    }
    if(str.length == 1) return "";
    return str.slice(0, -1);
  }

  private buildUrl(url: string, params: any | null | undefined = undefined, paginate: boolean = false): string {
    if(AppConfig.env.env.desktop) {
      if(AppConfig.run.instance_url == undefined) {
        this.router.navigateByUrl("/instance");
        throw new Error("Instance url not set. Redirecting to instance selection page.");
      }
      return AppConfig.run.instance_url + url + this.paramsString(params, paginate);
    } else return AppConfig.env.api.url + url + this.paramsString(params, paginate);
  }

  private headers() {
    let headers = AppConfig.const.apiHeaders;
    headers = headers.set('Authorization', `Bearer ${AppConfig.run.token}`);
    return headers;
  }

  private handleErrors(err: any, isUnauthorizedExpected: boolean = false) {
    if(err.status == 401 && !isUnauthorizedExpected) this.router.navigateByUrl('/login');
    else {
      try {
        if(Array.isArray(err.error)) {
          for (const error of err.error) {
            this.snackBar.open(AppConfig.errors.message(error.key), undefined, { duration: 3000 })
          }
        } else {
          this.snackBar.open(AppConfig.const.defaultError, undefined, { duration: 3000 })
        }
      } catch(_) {
        this.snackBar.open(AppConfig.const.defaultError, undefined, { duration: 3000 })
      }
    }
  }
}
