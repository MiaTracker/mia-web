import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {MediaIndex} from "../models/media-index.model";
import {MovieDetails} from "../models/movie-details";
import {HttpService} from "./http.service";
import {MovieMetadata} from "../models/movie-metadata";
import {Source, SourceCreate} from "../models/source";
import {IMediaService} from "../interfaces/imedia-service";
import {Log, LogCreate} from "../models/log";
import {SearchResults} from "../models/search-results";
import {SearchQuery} from "../models/search-query";

@Injectable({
  providedIn: 'root'
})
export class MoviesService implements IMediaService{

  constructor(private httpService: HttpService) { }

  public getMovies(): Observable<MediaIndex[]> {
    return this.httpService.getArr(MediaIndex,'/movies');
  }

  public search(query: SearchQuery, committed: boolean): Observable<SearchResults> {
    return this.httpService.postObj(SearchResults, '/movies/search', { committed: committed }, query);
  }

  public genres(): Observable<string[]> {
    return this.httpService.getStrArr('/movies/genres');
  }

  public getDetails(id: number): Observable<MovieDetails> {
    return this.httpService.getObj(MovieDetails, `/movies/${id}`);
  }

  public createMovie(id: number): Observable<number> {
    return this.httpService.post('/movies', { tmdb_id: id }, null).pipe(map(x => x as number));
  }

  public getMetadata(id: number): Observable<MovieMetadata> {
    return this.httpService.getObj(MovieMetadata, `/movies/${id}/metadata`);
  }

  public updateMetadata(metadata: MovieMetadata): Observable<Object> {
    return this.httpService.patch(`/movies/${metadata.id}/metadata`, null, metadata);
  }

  public deleteMovie(id: number): Observable<Object> {
    return this.httpService.delete(`/movies/${id}`);
  }

  public createTag(name: string, movie_id: number): Observable<Object> {
    return this.httpService.post(`/movies/${movie_id}/tags`, null, { name: name });
  }

  public deleteTag(tag_id: number, movie_id: number): Observable<Object> {
    return this.httpService.delete(`/movies/${movie_id}/tags/${tag_id}`);
  }

  public createGenre(name: string, movie_id: number): Observable<Object> {
    return this.httpService.post(`/movies/${movie_id}/genres`, null, { name: name });
  }

  public deleteGenre(genre_id: number, movie_id: number): Observable<Object> {
    return this.httpService.delete(`/movies/${movie_id}/genres/${genre_id}`);
  }

  public createTitle(name: string, movie_id: number): Observable<Object> {
    return this.httpService.post(`/movies/${movie_id}/titles`, null, { name: name });
  }

  public setPrimaryTitle(title_id: number, movie_id: number): Observable<Object> {
    return this.httpService.post(`/movies/${movie_id}/titles/${title_id}/primary`);
  }

  public deleteTitle(title_id: number, movie_id: number): Observable<Object> {
    return this.httpService.delete(`/movies/${movie_id}/titles/${title_id}`);
  }

  public createSource(source: SourceCreate, movie_id: number): Observable<Object> {
    return this.httpService.post(`/movies/${movie_id}/sources`, null, source);
  }

  public updateSource(source: Source, movie_id: number): Observable<Object> {
    return this.httpService.post(`/movies/${movie_id}/sources/${source.id}`, null, source);
  }

  public deleteSource(source_id: number, movie_id: number): Observable<Object> {
    return this.httpService.delete(`/movies/${movie_id}/sources/${source_id}`);
  }

  public createLog(log: LogCreate, movie_id: number): Observable<Object> {
    return this.httpService.post(`/movies/${movie_id}/logs`, null, log);
  }

  public updateLog(log: Log, movie_id: number): Observable<Object> {
    return this.httpService.post(`/movies/${movie_id}/logs/${log.id}`, null, log);
  }

  public deleteLog(log_id: number, movie_id: number): Observable<Object> {
    return this.httpService.delete(`/movies/${movie_id}/logs/${log_id}`);
  }
}
