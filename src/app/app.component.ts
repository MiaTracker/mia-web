import {Component, EventEmitter} from '@angular/core';
import {Location} from "@angular/common";
import {MoviesService} from "./services/movies.service";
import {Signals} from "./infrastructure/signals";
import {SeriesService} from "./services/series.service";
import {Globals} from "./infrastructure/globals";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  isBasePath: boolean = false;
  isLoginPage: boolean = true;
  searchbarReset = new EventEmitter<void>();
  addSearchbarReset = new EventEmitter<void>();
  addSearchbarVisible: boolean = true;

  constructor(private location: Location, private moviesService: MoviesService, private seriesService: SeriesService) {
    this.setLocationBasedState();
    location.onUrlChange(() => this.setLocationBasedState());
  }

  back(): void {
    this.location.back();
  }

  setLocationBasedState(): void {
    this.isBasePath = this.location.isCurrentPathEqualTo("/media")
      || this.location.isCurrentPathEqualTo("/movies")
      || this.location.isCurrentPathEqualTo("/series");
    this.isLoginPage = this.location.isCurrentPathEqualTo("/login")
    this.addSearchbarVisible = this.location.isCurrentPathEqualTo("/movies")  || this.location.isCurrentPathEqualTo("/series");
  }

  addMedia(event: any): void {
    let id = Number.parseInt(event.value);
    if(this.location.isCurrentPathEqualTo("/movies")) {
      this.moviesService.createMovie(id).subscribe({
        complete: () => {
          this.addSearchbarReset.emit();
          Signals.MovieIndexUpdated.emit();
        },
        error: () => { this.addSearchbarReset.emit(); }
      });
    } else if(this.location.isCurrentPathEqualTo("/series")) {
      this.seriesService.createSeries(id).subscribe(() => {
        this.addSearchbarReset.emit();
        Signals.MovieIndexUpdated.emit();
      });
    }
  }

  protected search(query: string | null): void {
    Globals.SearchQuery = query;
    Signals.Search.emit();
  }

  protected resetSearchbar(): void {
    this.searchbarReset.emit();
    Globals.SearchQuery = null;
  }
}
