import {Component, ElementRef, EventEmitter, ViewChild} from '@angular/core';
import {Location} from "@angular/common";
import {Signals} from "./infrastructure/signals";
import {Globals} from "./infrastructure/globals";
import {AppConfig} from "./config/app.config";
import {Router} from "@angular/router";
import {FormControl, ValidationErrors} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {SearchQuery} from "./models/search-query";

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
  naiveFilterVisible = false;

  minStarsControl = new FormControl<number | null>(Globals.SearchQuery.min_stars, {
    updateOn: "change",
    validators: [(x): ValidationErrors | null => {
      if(x.value > 10 || x.value < 0) return [ "Value out of valid range" ]
      return null
    }]})
  onlyWatchedControl = new FormControl<boolean>(Globals.SearchQuery.only_watched, { updateOn: "change" })


  @ViewChild('drawer') drawerElm: ElementRef | undefined;

  constructor(private location: Location, private router: Router) {
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
  }

  back(): void {
    this.location.back();
  }

  setLocationBasedState(): void {
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
    Globals.SearchQuery = new SearchQuery("", [], false, null);
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
  }

  protected removeGenreFilter(genre: String): void {
    const idx = Globals.SearchQuery.genres.indexOf(genre);
    if(idx >= 0) {
      Globals.SearchQuery.genres.splice(idx, 1);
      Signals.Search.emit();
    }
  }

  protected toggleNaiveFilter() {
    this.naiveFilterVisible = !this.naiveFilterVisible;
  }

  protected readonly Globals = Globals;
}
