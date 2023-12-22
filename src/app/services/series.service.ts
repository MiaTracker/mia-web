import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {MediaIndex} from "../models/media-index.model";
import {SeriesDetails} from "../models/series-details";

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  constructor(private httpService: HttpService) {
  }

  public getSeries(): Observable<MediaIndex[]> {
    return this.httpService.getArr(MediaIndex, '/series');
  }

  public getDetails(id: number): Observable<SeriesDetails> {
    return this.httpService.getObj(SeriesDetails, `/series/${id}`);
  }

  public createSeries(id: number): Observable<Object> {
    return this.httpService.post('/series', { tmdb_id: id }, null);
  }
}
