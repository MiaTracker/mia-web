import {Component, OnDestroy, OnInit} from '@angular/core';
import {MediaIndex} from "../../models/media-index.model";
import {MoviesService} from "../../services/movies.service";
import {Signals} from "../../infrastructure/signals";
import {SeriesService} from "../../services/series.service";
import {Location} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.sass']
})
export class IndexPageComponent implements OnInit, OnDestroy {
  public index: MediaIndex[] = [];
  public refreshConnection: Subscription | undefined;

  constructor(private moviesService: MoviesService, private seriesService: SeriesService, private location: Location) {
  }

  ngOnInit(): void {
    this.refreshConnection = Signals.MovieIndexUpdated.subscribe(() => this.getMedia());
    this.getMedia();
  }

  ngOnDestroy() {
    this.refreshConnection?.unsubscribe();
  }

  getMedia() {
    if(this.location.isCurrentPathEqualTo("/movies"))
      this.moviesService.getMovies().subscribe(media => this.index = media);
    else if(this.location.isCurrentPathEqualTo("/series"))
      this.seriesService.getSeries().subscribe(media => this.index = media);
  }
}
