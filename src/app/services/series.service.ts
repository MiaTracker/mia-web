import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {map, Observable} from "rxjs";
import {MediaIndex} from "../models/media-index.model";
import {SeriesDetails} from "../models/series-details";
import {IMediaService} from "../interfaces/imedia-service";
import {Source, SourceCreate} from "../models/source";
import {Log, LogCreate} from "../models/log";
import {SearchResults} from "../models/search-results";
import {SeriesMetadata} from "../models/series-metadata";
import {SearchQuery} from "../models/search-query";
import {Images} from "../models/images";
import {ImagesUpdate} from "../models/images-update";

@Injectable({
  providedIn: 'root'
})
export class SeriesService implements IMediaService {
  constructor(private httpService: HttpService) {
  }

  public getSeries(): Observable<MediaIndex[]> {
    return this.httpService.getArr(MediaIndex, '/series');
  }

  public search(query: SearchQuery, committed: boolean): Observable<SearchResults> {
    return this.httpService.postObj(SearchResults, '/series/search', { committed: committed }, query);
  }

  public genres(): Observable<string[]> {
    return this.httpService.getStrArr('/series/genres');
  }

  public getDetails(id: number): Observable<SeriesDetails> {
    return this.httpService.getObj(SeriesDetails, `/series/${id}`);
  }

  public createSeries(id: number): Observable<number> {
    return this.httpService.post('/series', { tmdb_id: id }, null).pipe(map(x => x as number));
  }

  public getMetadata(id: number): Observable<SeriesMetadata> {
    return this.httpService.getObj(SeriesMetadata, `/series/${id}/metadata`);
  }

  public updateMetadata(metadata: SeriesMetadata): Observable<Object> {
    return this.httpService.patch(`/series/${metadata.id}/metadata`, null, metadata);
  }

  public images(id: number): Observable<Object> {
    return this.httpService.getObj(Images, `/series/${id}/images`);
  }

  public updateImages(id: number, images: ImagesUpdate): Observable<Object> {
    return this.httpService.patch(`/series/${id}/images`, null, images);
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

  public createLog(log: LogCreate, movie_id: number): Observable<Object> {
    return this.httpService.post(`/series/${movie_id}/logs`, null, log);
  }

  public updateLog(log: Log, movie_id: number): Observable<Object> {
    return this.httpService.post(`/series/${movie_id}/logs/${log.id}`, null, log);
  }

  public deleteLog(log_id: number, movie_id: number): Observable<Object> {
    return this.httpService.delete(`/series/${movie_id}/logs/${log_id}`);
  }
}
