import {Component, OnDestroy, OnInit} from '@angular/core';
import {MediaIndex} from "../../models/media-index.model";
import {MoviesService} from "../../services/movies.service";
import {Signals} from "../../infrastructure/signals";
import {SeriesService} from "../../services/series.service";
import {Location} from "@angular/common";
import {Subscription} from "rxjs";
import {Globals} from "../../infrastructure/globals";
import {MediaService} from "../../services/media.service";
import {ExternalIndex} from "../../models/external-index";
import {MediaType} from "../../enums/media-type.enum";
import {Router} from "@angular/router";
import {WatchlistService} from "../../services/watchlist.service";

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.sass']
})
export class IndexPageComponent implements OnInit, OnDestroy {
  public index: MediaIndex[] = [];
  public external: ExternalIndex[] = [];
  public refreshConnection: Subscription | undefined;
  protected isMixed: boolean = false;
  private searchSubscription: Subscription | undefined;

  constructor(private mediaService: MediaService, private moviesService: MoviesService, private seriesService: SeriesService, private watchlistService: WatchlistService, private location: Location, private router: Router) {
  }

  ngOnInit(): void {
    this.isMixed = this.location.isCurrentPathEqualTo("/media") || this.location.isCurrentPathEqualTo("/watchlist");
    this.searchSubscription = Signals.Search.subscribe(() => this.getMedia());
    this.getMedia();
  }

  ngOnDestroy() {
    this.refreshConnection?.unsubscribe();
    this.searchSubscription?.unsubscribe();
  }

  getMedia() {
    if(Globals.SearchQuery.query || Globals.SearchQuery.only_watched || Globals.SearchQuery.genres || Globals.SearchQuery.min_stars) {
      if(this.location.isCurrentPathEqualTo("/media"))
        this.mediaService.search(Globals.SearchQuery, Globals.SearchCommitted).subscribe(x => {
          this.setMedia(x.indexes, x.external);
          Globals.SearchQueryValid = x.query_valid;
        });
      else if(this.location.isCurrentPathEqualTo("/movies"))
        this.moviesService.search(Globals.SearchQuery, Globals.SearchCommitted).subscribe(x => {
          this.setMedia(x.indexes, x.external);
          Globals.SearchQueryValid = x.query_valid;
        });
      else if(this.location.isCurrentPathEqualTo("/series"))
        this.seriesService.search(Globals.SearchQuery, Globals.SearchCommitted).subscribe(x => {
          this.setMedia(x.indexes, x.external);
          Globals.SearchQueryValid = x.query_valid;
        });
      else if(this.location.isCurrentPathEqualTo("/watchlist"))
        this.watchlistService.search(Globals.SearchQuery).subscribe(x => {
          this.setMedia(x.indexes, null);
          Globals.SearchQueryValid = x.query_valid;
        });
    } else {
      if(this.location.isCurrentPathEqualTo("/media"))
        this.mediaService.getMedia().subscribe(media => this.setMedia(media, null));
      else if(this.location.isCurrentPathEqualTo("/movies"))
        this.moviesService.getMovies().subscribe(media => this.setMedia(media, null));
      else if(this.location.isCurrentPathEqualTo("/series"))
        this.seriesService.getSeries().subscribe(media => this.setMedia(media, null));
      else if(this.location.isCurrentPathEqualTo("/watchlist"))
        this.watchlistService.index().subscribe(media => this.setMedia(media, null));
    }
  }

  protected track(i: number, idx: MediaIndex) {
    return idx.id
  }

  protected trackExternal(i: number, idx: ExternalIndex) {
    return idx.external_id
  }

  protected createExternal(idx: ExternalIndex): void {
    if(idx.type == MediaType.Movie) {
      this.moviesService.createMovie(idx.external_id).subscribe(id => this.router.navigateByUrl(`/movie/${id}`));
    } else {
      this.seriesService.createSeries(idx.external_id).subscribe(id => this.router.navigateByUrl(`/series/${id}`));
    }
  }

  private setMedia(media: MediaIndex[], external: ExternalIndex[] | null): void {
    this.index = media;
    this.external = external ?? [];
  }
}
