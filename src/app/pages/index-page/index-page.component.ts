import {Component, OnDestroy, OnInit} from '@angular/core';
import {MediaIndex} from "../../models/media-index.model";
import {MoviesService} from "../../services/movies.service";
import {Signals} from "../../infrastructure/signals";
import {SignalConnection} from "typed-signals";

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.sass']
})
export class IndexPageComponent implements OnInit, OnDestroy {
  public index: MediaIndex[] = [];
  public refreshConnection: SignalConnection | undefined;

  constructor(private moviesService: MoviesService) {
  }

  ngOnInit(): void {
    this.refreshConnection = Signals.MovieIndexUpdated.connect(() => this.getMovies());
    this.getMovies();
  }

  ngOnDestroy() {
    this.refreshConnection?.disconnect();
  }

  getMovies() {
    this.moviesService.getMovies().subscribe(movies => this.index = movies);
  }
}
