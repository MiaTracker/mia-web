import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Observable, of} from "rxjs";
import {MediaIndex} from "../models/media-index.model";
import {SearchResults} from "../models/search-results";
import {SearchQuery} from "../models/search-query";
import {LanguageIndex} from "../models/language-index";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private httpService: HttpService) { }

  public getMedia(): Observable<MediaIndex[]> {
    return this.httpService.getArr(MediaIndex,'/media');
  }

  public search(query: SearchQuery, committed: boolean): Observable<SearchResults> {
    return this.httpService.postObj(SearchResults, '/media/search', { committed: committed }, query);
  }

  public genres(): Observable<string[]> {
    return this.httpService.getStrArr('/genres');
  }

  public languages(): Observable<LanguageIndex[]> {
    return this.httpService.getArr(LanguageIndex, '/languages');
  }
}
