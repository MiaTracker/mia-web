import {Component, Input} from '@angular/core';
import {MovieDetails} from "../../models/movie-details";
import {MoviesService} from "../../services/movies.service";
import {AppConfig} from "../../config/app.config";

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
        for (const size of AppConfig.const.imagesConfiguration.poster_sizes) {
          if (!size.startsWith("w")) continue;
          this.posterSrcset.push(`${AppConfig.const.imagesConfiguration.secure_base_url + size + m.poster_path} ${size.substring(1)}w`);
        }
        this.posterUrl = AppConfig.const.imagesConfiguration.secure_base_url + AppConfig.const.imagesConfiguration.poster_sizes[AppConfig.const.imagesConfiguration.poster_sizes.length - 1] + m.poster_path;
      } else {
        this.posterUrl = AppConfig.env.undefinedImageUrl;
      }
      if(m.backdrop_path) {
        for (const size of AppConfig.const.imagesConfiguration.backdrop_sizes) {
          if (!size.startsWith("w")) continue;
          this.backdropSrcset.push(`${AppConfig.const.imagesConfiguration.secure_base_url + size + m.backdrop_path} ${size.substring(1)}w`);
        }
        this.backdropUrl = AppConfig.const.imagesConfiguration.secure_base_url + AppConfig.const.imagesConfiguration.backdrop_sizes[AppConfig.const.imagesConfiguration.backdrop_sizes.length - 1] + m.backdrop_path;
      } else {
        this.backdropUrl = AppConfig.env.undefinedImageUrl;
      }
      this.movie = m;
    });
  }

  constructor(private moviesService: MoviesService) {
  }
}
