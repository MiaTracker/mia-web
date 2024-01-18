import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {MediaIndex} from "../models/media-index.model";
import {MovieDetails} from "../models/movie-details";
import {HttpService} from "./http.service";
import {MovieMetadata} from "../models/movie-metadata";
import {Source, SourceCreate} from "../models/source";
import {IMediaService} from "../interfaces/imedia-service";

@Injectable({
  providedIn: 'root'
})
export class MoviesService implements IMediaService{

  constructor(private httpService: HttpService) { }

  public getMovies(): Observable<MediaIndex[]> {
    return this.httpService.getArr(MediaIndex,'/movies');
  }

  public getDetails(id: number): Observable<MovieDetails> {
    return this.httpService.getObj(MovieDetails, `/movies/${id}`);
  }

  public createMovie(id: number): Observable<Object> {
    return this.httpService.post('/movies', { tmdb_id: id }, null);
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
}
