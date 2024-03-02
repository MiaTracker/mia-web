import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {MediaIndex} from "../models/media-index.model";
import {SearchResults} from "../models/search-results";
import {SearchQuery} from "../models/search-query";

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

  public search(query: SearchQuery): Observable<SearchResults> {
    return this.httpService.postObj(SearchResults, '/watchlist/search', null, query);
  }

  public remove(media_id: number): Observable<Object> {
    return this.httpService.post('/watchlist/remove', null, { media_id: media_id });
  }
}
