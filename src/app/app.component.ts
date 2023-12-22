import {Component} from '@angular/core';
import {Location} from "@angular/common";
import {Signal} from "typed-signals";
import {MoviesService} from "./services/movies.service";
import {Signals} from "./infrastructure/signals";
import {SeriesService} from "./services/series.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  isBasePath: boolean = false;
  isLoginPage: boolean = true;
  searchbarReset = new Signal<() => void>();
  searchbarVisible: boolean = true;

  constructor(private location: Location, private moviesService: MoviesService, private seriesService: SeriesService) {
    this.setLocationBasedState();
    location.onUrlChange(() => this.setLocationBasedState());
  }

  back(): void {
    this.location.back();
  }

  setLocationBasedState(): void {
    this.isBasePath = this.location.isCurrentPathEqualTo("/");
    this.isLoginPage = this.location.isCurrentPathEqualTo("/login")
    this.searchbarVisible = this.location.isCurrentPathEqualTo("/movies")  || this.location.isCurrentPathEqualTo("/series");
  }

  addMedia(event: any): void {
    let id = Number.parseInt(event.value);
    if(this.location.isCurrentPathEqualTo("/movies")) {
      this.moviesService.createMovie(id).subscribe(() => {
        this.searchbarReset.emit();
        Signals.MovieIndexUpdated.emit();
      });
    } else if(this.location.isCurrentPathEqualTo("/series")) {
      this.seriesService.createSeries(id).subscribe(() => {
        this.searchbarReset.emit();
        Signals.MovieIndexUpdated.emit();
      });
    }
  }
}
