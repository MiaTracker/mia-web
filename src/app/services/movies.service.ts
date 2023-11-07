import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {MediaIndex} from "../models/media-index.model";
import {AppConstants} from "../constants/app.constants";
import {MovieDetails} from "../models/movie-details";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpService: HttpClient) { }

  public getMovies(): Observable<MediaIndex[]> {
    return this.httpService.get<MediaIndex[]>(`${AppConstants.ApiUrl}/movies`, { headers: AppConstants.ApiHeaders }).pipe(map(data =>
      data.map(data => MediaIndex.deserialize(data))));
  }

  public getDetails(id: number): Observable<MovieDetails> {
    return this.httpService.get<MovieDetails>(`${AppConstants.ApiUrl}/movies/${id}`, { headers: AppConstants.ApiHeaders }).pipe(map(data => MovieDetails.deserialize(data)));
  }

  public createMovie(id: number): Observable<Object> {
    return this.httpService.post(`${AppConstants.ApiUrl}/media?tmdb_id=${id}&type=movie`, null, { headers: AppConstants.ApiHeaders });
  }
}
