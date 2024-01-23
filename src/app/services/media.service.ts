import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {MediaIndex} from "../models/media-index.model";
import {SearchResults} from "../models/search-results";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private httpService: HttpService) { }

  public getMedia(): Observable<MediaIndex[]> {
    return this.httpService.getArr(MediaIndex,'/media');
  }

  public search(query: string): Observable<SearchResults> {
    return this.httpService.getObj(SearchResults, '/media/search', { query: query });
  }
}
