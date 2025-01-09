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
import {AppConfig} from "../../config/app.config";

@Component({
    selector: 'app-index-page',
    templateUrl: './index-page.component.html',
    styleUrls: ['./index-page.component.sass'],
    standalone: false
})
export class IndexPageComponent implements OnInit, OnDestroy {
  public index: MediaIndex[] = [];
  public external: ExternalIndex[] = [];
  public refreshConnection: Subscription | undefined;
  protected isMixed: boolean = false;
  private searchSubscription: Subscription | undefined;
  private nextPageSubscription: Subscription | undefined;
  private pageCurrentlyLoading: number = -1;

  constructor(private mediaService: MediaService, private moviesService: MoviesService, private seriesService: SeriesService, private watchlistService: WatchlistService, private location: Location, private router: Router) {
  }

  ngOnInit(): void {
    this.isMixed = this.location.isCurrentPathEqualTo("/media") || this.location.isCurrentPathEqualTo("/watchlist");
    this.searchSubscription = Signals.Search.subscribe(() => {
      Globals.SearchCurrentPage = 0;
      Globals.SearchLastPageLoaded = false;
      this.pageCurrentlyLoading = -1;
      this.getMedia(Globals.SearchCurrentPage + 1);
    });
    this.nextPageSubscription = Signals.SearchNextPage.subscribe((p) => this.getMedia(p));
    Globals.SearchCurrentPage = 0;
    Globals.SearchLastPageLoaded = false;
    this.pageCurrentlyLoading = -1;
    this.getMedia(Globals.SearchCurrentPage + 1);
  }

  ngOnDestroy() {
    this.refreshConnection?.unsubscribe();
    this.searchSubscription?.unsubscribe();
    this.nextPageSubscription?.unsubscribe();
  }

  getMedia(page: number) {
    if(this.pageCurrentlyLoading >= page) return;
    this.pageCurrentlyLoading = page;
    if(Globals.SearchQuery.query || Globals.SearchQuery.only_watched || Globals.SearchQuery.genres.length > 0 || Globals.SearchQuery.min_stars) {
      if(this.location.isCurrentPathEqualTo("/media"))
        this.mediaService.search(Globals.SearchQuery, Globals.SearchCommitted).subscribe(x => {
          this.pushMedia(x.indexes, x.external, page);
          Globals.SearchQueryValid = x.query_valid;
        });
      else if(this.location.isCurrentPathEqualTo("/movies"))
        this.moviesService.search(Globals.SearchQuery, Globals.SearchCommitted).subscribe(x => {
          this.pushMedia(x.indexes, x.external, page);
          Globals.SearchQueryValid = x.query_valid;
        });
      else if(this.location.isCurrentPathEqualTo("/series"))
        this.seriesService.search(Globals.SearchQuery, Globals.SearchCommitted).subscribe(x => {
          this.pushMedia(x.indexes, x.external, page);
          Globals.SearchQueryValid = x.query_valid;
        });
      else if(this.location.isCurrentPathEqualTo("/watchlist"))
        this.watchlistService.search(Globals.SearchQuery).subscribe(x => {
          this.pushMedia(x.indexes, null, page);
          Globals.SearchQueryValid = x.query_valid;
        });
    } else {
      if(this.location.isCurrentPathEqualTo("/media"))
        this.mediaService.getMedia().subscribe(media => {
          this.pushMedia(media, null, page)
        });
      else if(this.location.isCurrentPathEqualTo("/movies"))
        this.moviesService.getMovies().subscribe(media => {
          this.pushMedia(media, null, page)
        });
      else if(this.location.isCurrentPathEqualTo("/series"))
        this.seriesService.getSeries().subscribe(media => {
          this.pushMedia(media, null, page)
        });
      else if(this.location.isCurrentPathEqualTo("/watchlist"))
        this.watchlistService.index().subscribe(media => {
          this.pushMedia(media, null, page)
        });
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

  private pushMedia(media: MediaIndex[], external: ExternalIndex[] | null, page: number): void {
    if(media.length + (external?.length ?? 0) < AppConfig.env.api.pageSize)
      Globals.SearchLastPageLoaded = true;
    if(page == 1) {
      this.index = media;
      this.external = external ?? [];
    } else {
      this.index.push(...media);
      if(external != null)
        this.external.push(...external);
    }
    Globals.SearchCurrentPage = page;
  }
}
