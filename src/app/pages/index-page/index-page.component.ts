import {Component, OnDestroy, OnInit} from '@angular/core';
import {MediaIndex} from "../../models/media-index.model";
import {MoviesService} from "../../services/movies.service";
import {Signals} from "../../infrastructure/signals";
import {SeriesService} from "../../services/series.service";
import {Location} from "@angular/common";
import {Subscription} from "rxjs";
import {Globals} from "../../infrastructure/globals";
import {MediaService} from "../../services/media.service";

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.sass']
})
export class IndexPageComponent implements OnInit, OnDestroy {
  public index: MediaIndex[] = [];
  public refreshConnection: Subscription | undefined;
  protected isMixed: boolean = false;
  private searchSubscription: Subscription | undefined;

  constructor(private mediaService: MediaService, private moviesService: MoviesService, private seriesService: SeriesService, private location: Location) {
  }

  ngOnInit(): void {
    this.isMixed = this.location.isCurrentPathEqualTo("/media");
    this.refreshConnection = Signals.MovieIndexUpdated.subscribe(() => this.getMedia());
    this.searchSubscription = Signals.Search.subscribe(() => this.getMedia());
    this.getMedia();
  }

  ngOnDestroy() {
    this.refreshConnection?.unsubscribe();
    this.searchSubscription?.unsubscribe();
  }

  getMedia() {
    if(Globals.SearchQuery) {
      if(this.location.isCurrentPathEqualTo("/media"))
        this.mediaService.search(Globals.SearchQuery).subscribe(media => this.setMedia(media));
      else if(this.location.isCurrentPathEqualTo("/movies"))
        this.moviesService.search(Globals.SearchQuery).subscribe(media => this.setMedia(media));
      else if(this.location.isCurrentPathEqualTo("/series"))
        this.seriesService.search(Globals.SearchQuery).subscribe(media => this.setMedia(media));
    } else {
      if(this.location.isCurrentPathEqualTo("/media"))
        this.mediaService.getMedia().subscribe(media => this.setMedia(media));
      else if(this.location.isCurrentPathEqualTo("/movies"))
        this.moviesService.getMovies().subscribe(media => this.setMedia(media));
      else if(this.location.isCurrentPathEqualTo("/series"))
        this.seriesService.getSeries().subscribe(media => this.setMedia(media));
    }
  }

  protected track(i: number, idx: MediaIndex) {
    return idx.id
  }

  private setMedia(media: MediaIndex[]): void {
    this.index = media;
  }
}
