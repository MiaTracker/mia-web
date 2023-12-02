import {Component, Input} from '@angular/core';
import {MovieDetails} from "../../models/movie-details";
import {MoviesService} from "../../services/movies.service";
import {AppConstants} from "../../constants/app.constants";

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.sass']
})
export class DetailsPageComponent {
  public movie: MovieDetails | undefined = undefined;

  protected posterSrcset: string[] = [];
  protected posterUrl: string | undefined = undefined;
  protected backdropSrcset: string[] = [];
  protected backdropUrl: string | undefined = undefined;

  protected editable: boolean = false;

  @Input()
  set id(movie_id: number) {
    this.moviesService.getDetails(movie_id).subscribe(m => {
      if(m.poster_path) {
        for (const size of AppConstants.ImagesConfiguration.poster_sizes) {
          if (!size.startsWith("w")) continue;
          this.posterSrcset.push(`${AppConstants.ImagesConfiguration.secure_base_url + size + m.poster_path} ${size.substring(1)}w`);
        }
        this.posterUrl = AppConstants.ImagesConfiguration.secure_base_url + AppConstants.ImagesConfiguration.poster_sizes[AppConstants.ImagesConfiguration.poster_sizes.length - 1] + m.poster_path;
      } else {
        this.posterUrl = AppConstants.UndefinedImageUrl;
      }
      if(m.backdrop_path) {
        for (const size of AppConstants.ImagesConfiguration.backdrop_sizes) {
          if (!size.startsWith("w")) continue;
          this.backdropSrcset.push(`${AppConstants.ImagesConfiguration.secure_base_url + size + m.backdrop_path} ${size.substring(1)}w`);
        }
        this.backdropUrl = AppConstants.ImagesConfiguration.secure_base_url + AppConstants.ImagesConfiguration.backdrop_sizes[AppConstants.ImagesConfiguration.backdrop_sizes.length - 1] + m.backdrop_path;
      } else {
        this.backdropUrl = AppConstants.UndefinedImageUrl;
      }
      this.movie = m;
    });
  }

  constructor(private moviesService: MoviesService) {
  }

  protected readonly AppConstants = AppConstants;
}
