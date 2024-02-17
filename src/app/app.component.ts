import {Component, ElementRef, EventEmitter, ViewChild} from '@angular/core';
import {Location} from "@angular/common";
import {Signals} from "./infrastructure/signals";
import {Globals} from "./infrastructure/globals";
import {AppConfig} from "./config/app.config";
import {Router} from "@angular/router";

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

  @ViewChild('drawer') drawerElm: ElementRef | undefined;

  constructor(private location: Location, private router: Router) {
    this.setLocationBasedState();
    location.onUrlChange(() => this.setLocationBasedState());
    if(AppConfig.env.env.desktop && !AppConfig.run.instance_url)
      this.router.navigateByUrl("/instance");
  }

  back(): void {
    this.location.back();
  }

  setLocationBasedState(): void {
    this.isBaseMediaPath = this.location.isCurrentPathEqualTo("/media")
      || this.location.isCurrentPathEqualTo("/movies")
      || this.location.isCurrentPathEqualTo("/series")
      || this.location.isCurrentPathEqualTo("/watchlist");
    this.isBasePath = this.isBaseMediaPath || this.location.isCurrentPathEqualTo("/settings");
    this.isSettingsPath = this.location.path().startsWith("/settings/");
    this.hideNavbar = this.location.isCurrentPathEqualTo("/login") || this.location.isCurrentPathEqualTo("/instance")
  }

  protected search(query: string | null): void {
    Globals.SearchCommitted = false;
    Globals.SearchQuery = query;
    Signals.Search.emit();
  }

  protected commitSearch(): void {
    Globals.SearchCommitted = true;
    Signals.Search.emit();
  }

  protected resetSearchbar(): void {
    this.searchbarReset.emit();
    Globals.SearchQuery = null;
  }

  protected logOut(): void {
    this.resetSearchbar();
    AppConfig.run.clearToken();
    this.router.navigateByUrl("/login");
  }
}
