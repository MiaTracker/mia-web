import {Component, Input} from '@angular/core';
import {MovieDetails} from "../../models/movie-details";
import {MoviesService} from "../../services/movies.service";

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.sass']
})
export class MovieDetailsPageComponent {
  private _movie_id: number | undefined;

  public movie: MovieDetails | undefined = undefined;

  protected editable: boolean = false;

  @Input()
  get id(): number | undefined {
    return this._movie_id;
  }

  set id(movie_id: number) {
    this._movie_id = movie_id;
    this.getMovie();
  }

  constructor(private moviesService: MoviesService) {
  }

  protected cancel(): void {
    this.getMovie();
    this.editable = false;
  }

  protected save(): void {
    console.log(this.movie?.title);
  }

  private getMovie() {
    if(this.id) {
      this.moviesService.getDetails(this.id).subscribe(m => {
        this.movie = m;
      });
    }
  }

  protected createTag(event: any): void {
    this.moviesService.createTag(event.name, this._movie_id ?? 0).subscribe(_ => this.getMovie());
  }

  protected deleteTag(event: any): void {
    this.moviesService.deleteTag(event.tag.id, this._movie_id ?? 0).subscribe(_ => this.getMovie());
  }

  protected createGenre(event: any): void {
    this.moviesService.createGenre(event.name, this._movie_id ?? 0).subscribe(_ => this.getMovie());
  }

  protected deleteGenre(event: any): void {
    this.moviesService.deleteGenre(event.tag.id, this._movie_id ?? 0).subscribe(_ => this.getMovie());
  }

  protected createTitle(event: any): void {
    this.moviesService.createTitle(event.name, this._movie_id ?? 0).subscribe(_ => this.getMovie());
  }

  protected setPrimaryTitle(event: any): void {
    this.moviesService.setPrimaryTitle(event.tag.id, this._movie_id ?? 0).subscribe(_ => this.getMovie());
  }

  protected deleteTitle(event: any): void {
    this.moviesService.deleteTitle(event.tag.id, this._movie_id ?? 0).subscribe(_ => this.getMovie());
  }
}
