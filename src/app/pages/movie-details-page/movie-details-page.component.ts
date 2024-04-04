import {Component, Input} from '@angular/core';
import {MovieDetails} from "../../models/movie-details";
import {MoviesService} from "../../services/movies.service";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmationComponent} from "../../dialogs/delete-confirmation/delete-confirmation.component";
import {MovieMetadataEditComponent} from "../../dialogs/movie-metadata-edit/movie-metadata-edit.component";
import {WatchlistService} from "../../services/watchlist.service";

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

  set id(movie_id: string) {
    this._movie_id = parseInt(movie_id);
    this.getMovie();
  }

  constructor(protected moviesService: MoviesService, private watchlistService: WatchlistService, private location: Location, private dialog: MatDialog) {
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
          dialogRef.afterClosed().subscribe(_ => {
            this.getMovie()
          });
        }
      })
    }
  }

  protected deleteMovie(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, { data: { prompt: `Do you really want do delete "${this.movie?.title}"?` }, restoreFocus: false });
    dialogRef.afterClosed().subscribe(result => {
      if(result && this.id) {
        this.moviesService.deleteMovie(this.id).subscribe(_ => {
          this.location.back();
        })
      }
    });
  }

  protected addToWatchlist(): void {
    this.watchlistService.add(this.id ?? 0).subscribe(() => this.getMovie());
  }

  protected removeFromWatchlist(): void {
    this.watchlistService.remove(this.id ?? 0).subscribe(() => this.getMovie());
  }

  protected displayRuntime(runtime: number | null | undefined): string {
    if(!runtime) return "";
    return `${Math.floor(runtime / 60)}h ${runtime % 60}min`;
  }

  protected readonly Math = Math;
}
