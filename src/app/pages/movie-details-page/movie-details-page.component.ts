import {Component, Input} from '@angular/core';
import {MovieDetails} from "../../models/movie-details";
import {MoviesService} from "../../services/movies.service";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../dialogs/delete-confirmation/confirmation-dialog.component";

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.sass']
})
export class MovieDetailsPageComponent {
  private _movie_id: number | undefined;

  public movie: MovieDetails | undefined = undefined;

  protected editable: boolean = true;

  @Input()
  get id(): number | undefined {
    return this._movie_id;
  }

  set id(movie_id: number) {
    this._movie_id = movie_id;
    this.getMovie();
  }

  constructor(private moviesService: MoviesService, private location: Location, private dialog: MatDialog) {
  }

  private getMovie() {
    if(this.id) {
      this.moviesService.getDetails(this.id).subscribe(m => {
        this.movie = m;
      });
    }
  }

  protected deleteMovie(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { prompt: `Do you really want do delete "${this.movie?.title}"?` }, restoreFocus: false });
    dialogRef.afterClosed().subscribe(result => {
      if(result && this.id) {
        this.moviesService.deleteMovie(this.id).subscribe(_ => {
          this.location.back();
        })
      }
    });
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
