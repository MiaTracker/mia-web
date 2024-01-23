import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {MediaIndex} from "../models/media-index.model";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private httpService: HttpService) { }

  public getMedia(): Observable<MediaIndex[]> {
    return this.httpService.getArr(MediaIndex,'/media');
  }

  public search(query: string): Observable<MediaIndex[]> {
    return this.httpService.getArr(MediaIndex, '/media/search', { query: query });
  }
}
