import {Component, Input} from '@angular/core';
import {MovieDetails} from "../../models/movie-details";
import {MoviesService} from "../../services/movies.service";

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.sass']
})
export class MovieDetailsPageComponent {
  public movie: MovieDetails | undefined = undefined;

  protected editable: boolean = false;

  @Input()
  set id(movie_id: number) {
    this.moviesService.getDetails(movie_id).subscribe(m => {
      this.movie = m;
    });
  }

  constructor(private moviesService: MoviesService) {
  }
}
