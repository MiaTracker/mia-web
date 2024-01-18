import {Component, Input} from '@angular/core';
import {MovieDetails} from "../../models/movie-details";
import {MoviesService} from "../../services/movies.service";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../dialogs/delete-confirmation/confirmation-dialog.component";
import {MovieMetadataEditComponent} from "../../dialogs/movie-metadata-edit/movie-metadata-edit.component";

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

  constructor(protected moviesService: MoviesService, private location: Location, private dialog: MatDialog) {
  }

  protected getMovie() {
    if(this.id) {
      this.moviesService.getDetails(this.id).subscribe(m => {
        this.movie = m;
      });
    }
  }

  protected editMetadata(): void {
    if(this.id) {
      this.moviesService.getMetadata(this.id).subscribe({
        next: (data) => {
          let dialogRef = this.dialog.open(MovieMetadataEditComponent, { data: data, restoreFocus: false, autoFocus: "false" });
          dialogRef.afterClosed().subscribe(result => {
            if(result && this.id) {
              this.moviesService.updateMetadata(result).subscribe({
                complete: () => { this.getMovie() }
              });
            }
          });
        }
      })
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
}
