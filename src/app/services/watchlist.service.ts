import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {MediaIndex} from "../models/media-index.model";

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor(private httpService: HttpService) { }

  public add(media_id: number): Observable<Object> {
    return this.httpService.post('/watchlist/add', null, { media_id: media_id });
  }

  public index(): Observable<MediaIndex[]> {
    return this.httpService.getArr(MediaIndex, '/watchlist');
  }

  public search(query: string): Observable<MediaIndex[]> {
    return this.httpService.getArr(MediaIndex, '/watchlist/search', { query: query });
  }

  public remove(media_id: number): Observable<Object> {
    return this.httpService.post('/watchlist/remove', null, { media_id: media_id });
  }
}
