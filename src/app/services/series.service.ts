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

  public deleteSeries(id: number): Observable<Object> {
    return this.httpService.delete(`/series/${id}`);
  }

  public createTag(name: string, movie_id: number): Observable<Object> {
    return this.httpService.post(`/series/${movie_id}/tags`, null, { name: name });
  }

  public deleteTag(tag_id: number, movie_id: number): Observable<Object> {
    return this.httpService.delete(`/series/${movie_id}/tags/${tag_id}`);
  }

  public createGenre(name: string, movie_id: number): Observable<Object> {
    return this.httpService.post(`/series/${movie_id}/genres`, null, { name: name });
  }

  public deleteGenre(genre_id: number, movie_id: number): Observable<Object> {
    return this.httpService.delete(`/series/${movie_id}/genres/${genre_id}`);
  }

  public createTitle(name: string, movie_id: number): Observable<Object> {
    return this.httpService.post(`/series/${movie_id}/titles`, null, { name: name });
  }

  public setPrimaryTitle(title_id: number, movie_id: number): Observable<Object> {
    return this.httpService.post(`/series/${movie_id}/titles/${title_id}/primary`);
  }

  public deleteTitle(title_id: number, movie_id: number): Observable<Object> {
    return this.httpService.delete(`/series/${movie_id}/titles/${title_id}`);
  }
}
