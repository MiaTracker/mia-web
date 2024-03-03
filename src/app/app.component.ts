import {Component, ElementRef, EventEmitter, ViewChild} from '@angular/core';
import {Location} from "@angular/common";
import {Signals} from "./infrastructure/signals";
import {Globals} from "./infrastructure/globals";
import {AppConfig} from "./config/app.config";
import {Router} from "@angular/router";
import {FormControl, ValidationErrors} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {SearchQuery} from "./models/search-query";
import {MediaService} from "./services/media.service";
import {MoviesService} from "./services/movies.service";
import {SeriesService} from "./services/series.service";
import {COMMA, ENTER, SEMICOLON} from "@angular/cdk/keycodes";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {SortTarget} from "./enums/sort-target";

interface Type {
  value: SortTarget,
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  isBasePath: boolean = false;
  isBaseMediaPath: boolean = false;
  isSettingsPath: boolean = false;
  hideNavbar: boolean = true;
  searchbarReset = new EventEmitter<void>();
  validGenres: string[] = [];
  filteredGenres: string[] = [];
  genreFilterControl = new FormControl<string | null>('', { updateOn: "change" });
  sortTargets: Type[] = [
    { value: SortTarget.Title, viewValue: "Title" },
    { value: SortTarget.Stars, viewValue: "Stars" },
    { value: SortTarget.TimesWatched, viewValue: "Times watched" }
  ];
  get selectedSortTarget(): SortTarget {
    return Globals.SearchQuery.sort_by;
  }
  set selectedSortTarget(target: SortTarget) {
    Globals.SearchQuery.sort_by = target;
    Signals.Search.emit();
  }


  private service: MediaService | MoviesService | SeriesService | null = null;

  private _naiveFilterVisible = false;
  get naiveFilterVisible(): boolean { return this._naiveFilterVisible; }
  set naiveFilterVisible(v: boolean) {
    if(v) {
      this.service?.genres().subscribe({
        next: genres => this.validGenres = genres
      });
    }
    this._naiveFilterVisible = v;
  }

  minStarsControl = new FormControl<number | null>(Globals.SearchQuery.min_stars, {
    updateOn: "change",
    validators: [(x): ValidationErrors | null => {
      if(x.value > 10 || x.value < 0) return [ "Value out of valid range" ]
      return null
    }]})
  onlyWatchedControl = new FormControl<boolean>(Globals.SearchQuery.only_watched, { updateOn: "change" })


  @ViewChild('drawer') drawerElm: ElementRef | undefined;
  @ViewChild('genreFilter') genreFilter!: ElementRef<HTMLInputElement>;

  constructor(private location: Location, private router: Router, private mediaService: MediaService,
              private moviesService: MoviesService, private seriesService: SeriesService) {
    this.setLocationBasedState();
    location.onUrlChange(() => this.setLocationBasedState());
    if(AppConfig.env.env.desktop && !AppConfig.run.instance_url)
      this.router.navigateByUrl("/instance");
    this.minStarsControl.valueChanges.subscribe({
      next: (x)=> {
        if(this.minStarsControl.valid) {
          Globals.SearchQuery.min_stars = x;
          Signals.Search.emit();
        }
      }
    });
    this.onlyWatchedControl.valueChanges.subscribe({
      next: (x)=> {
        Globals.SearchQuery.only_watched = x ?? false;
        Signals.Search.emit();
      }
    });
    this.genreFilterControl.valueChanges.subscribe(
      {
        next: (v) => {
          this.filteredGenres = (v ? this._filterValidGenres(v) : this.validGenres.slice())
        }
      }
    )
  }

  back(): void {
    this.location.back();
  }

  setLocationBasedState(): void {
    if(this.location.isCurrentPathEqualTo("/media")) this.service = this.mediaService;
    else if(this.location.isCurrentPathEqualTo("/movies")) this.service = this.moviesService;
    else if(this.location.isCurrentPathEqualTo("/series")) this.service = this.seriesService;
    if(this.naiveFilterVisible) {
      this.service?.genres().subscribe({
        next: genres => {
          this.validGenres = genres;
        }
      });
    }

    this.isBaseMediaPath = this.location.isCurrentPathEqualTo("/media")
      || this.location.isCurrentPathEqualTo("/movies")
      || this.location.isCurrentPathEqualTo("/series")
      || this.location.isCurrentPathEqualTo("/watchlist");
    this.isBasePath = this.isBaseMediaPath || this.location.isCurrentPathEqualTo("/settings") || this.location.isCurrentPathEqualTo("/statistics");
    this.isSettingsPath = this.location.path().startsWith("/settings/");
    this.hideNavbar = this.location.isCurrentPathEqualTo("/login") || this.location.isCurrentPathEqualTo("/instance")
  }

  protected search(query: string | null): void {
    Globals.SearchCommitted = false;
    Globals.SearchQuery.query = query ?? "";
    Signals.Search.emit();
  }

  protected commitSearch(): void {
    Globals.SearchCommitted = true;
    Signals.Search.emit();
  }

  protected resetSearchbar(link: string | null = null): void {
    this.searchbarReset.emit();
    Globals.SearchQuery = new SearchQuery("", [], false, null, SortTarget.Title);
    this.minStarsControl.reset();
    Globals.SearchQueryValid = true;
    if(link != null && this.location.isCurrentPathEqualTo(link))
      Signals.Search.emit(null);
  }

  protected logOut(): void {
    this.resetSearchbar();
    AppConfig.run.clearToken();
    this.router.navigateByUrl("/login");
  }

  protected addGenreFilter(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    if(value && Globals.SearchQuery.genres.indexOf(value) == -1) {
      Globals.SearchQuery.genres.push(value);
      Signals.Search.emit();
    }
    event.chipInput.clear();
    this.genreFilter.nativeElement.value = "";
    this.genreFilterControl.setValue(null);
  }

  protected removeGenreFilter(genre: String): void {
    const idx = Globals.SearchQuery.genres.indexOf(genre);
    if(idx >= 0) {
      Globals.SearchQuery.genres.splice(idx, 1);
      Signals.Search.emit();
    }
  }

  protected genreFilterSelected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue.trim();

    if(value && Globals.SearchQuery.genres.indexOf(value) == -1) {
      Globals.SearchQuery.genres.push(value);
      Signals.Search.emit();
    }
    this.genreFilter.nativeElement.value = "";
    this.genreFilterControl.reset();
  }

  protected toggleNaiveFilter() {
    this.naiveFilterVisible = !this.naiveFilterVisible;
  }

  private _filterValidGenres(value: String): string[] {
    const filterValue = value.toLowerCase();
    return this.validGenres.filter(genre => genre.toLowerCase().includes(filterValue));
  }

  protected readonly Globals = Globals;
  protected readonly ENTER = ENTER;
  protected readonly COMMA = COMMA;
  protected readonly SEMICOLON = SEMICOLON;
}
