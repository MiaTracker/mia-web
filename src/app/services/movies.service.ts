import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {MediaIndex} from "../models/media-index.model";
import {MovieDetails} from "../models/movie-details";
import {AppConfig} from "../config/app.config";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpService: HttpClient) { }

  public getMovies(): Observable<MediaIndex[]> {
    return this.httpService.get<MediaIndex[]>(`${AppConfig.env.api.url}/movies`, { headers: AppConfig.const.apiHeaders }).pipe(map(data =>
      data.map(data => MediaIndex.deserialize(data))));
  }

  public getDetails(id: number): Observable<MovieDetails> {
    return this.httpService.get<MovieDetails>(`${AppConfig.env.api.url}/movies/${id}`, { headers: AppConfig.const.apiHeaders }).pipe(map(data => MovieDetails.deserialize(data)));
  }

  public createMovie(id: number): Observable<Object> {
    return this.httpService.post(`${AppConfig.env.api.url}/media?tmdb_id=${id}&type=movie`, null, { headers: AppConfig.const.apiHeaders });
  }
}
