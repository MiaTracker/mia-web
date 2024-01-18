import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {MediaIndex} from "../models/media-index.model";
import {SeriesDetails} from "../models/series-details";
import {MovieMetadata} from "../models/movie-metadata";
import {IMediaService} from "../interfaces/imedia-service";
import {Source, SourceCreate} from "../models/source";

@Injectable({
  providedIn: 'root'
})
export class SeriesService implements IMediaService {
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

  public getMetadata(id: number): Observable<MovieMetadata> {
    return this.httpService.getObj(MovieMetadata, `/series/${id}/metadata`);
  }

  public updateMetadata(metadata: MovieMetadata): Observable<Object> {
    return this.httpService.patch(`/series/${metadata.id}/metadata`, null, metadata);
  }

  public deleteSeries(id: number): Observable<Object> {
    return this.httpService.delete(`/series/${id}`);
  }

  public createTag(name: string, series_id: number): Observable<Object> {
    return this.httpService.post(`/series/${series_id}/tags`, null, { name: name });
  }

  public deleteTag(tag_id: number, series_id: number): Observable<Object> {
    return this.httpService.delete(`/series/${series_id}/tags/${tag_id}`);
  }

  public createGenre(name: string, series_id: number): Observable<Object> {
    return this.httpService.post(`/series/${series_id}/genres`, null, { name: name });
  }

  public deleteGenre(genre_id: number, series_id: number): Observable<Object> {
    return this.httpService.delete(`/series/${series_id}/genres/${genre_id}`);
  }

  public createTitle(name: string, series_id: number): Observable<Object> {
    return this.httpService.post(`/series/${series_id}/titles`, null, { name: name });
  }

  public setPrimaryTitle(title_id: number, series_id: number): Observable<Object> {
    return this.httpService.post(`/series/${series_id}/titles/${title_id}/primary`);
  }

  public deleteTitle(title_id: number, series_id: number): Observable<Object> {
    return this.httpService.delete(`/series/${series_id}/titles/${title_id}`);
  }

  public createSource(source: SourceCreate, series_id: number): Observable<Object> {
    return this.httpService.post(`/series/${series_id}/sources`, null, source);
  }

  public updateSource(source: Source, series_id: number): Observable<Object> {
    return this.httpService.post(`/series/${series_id}/sources/${source.id}`, null, source);
  }

  public deleteSource(source_id: number, series_id: number): Observable<Object> {
    return this.httpService.delete(`/series/${series_id}/sources/${source_id}`);
  }
}
