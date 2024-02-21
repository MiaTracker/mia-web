import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {Stats} from "../models/stats";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private httpService: HttpService) { }

  public statistics(): Observable<Stats> {
    return this.httpService.getObj(Stats, '/statistics');
  }
}
