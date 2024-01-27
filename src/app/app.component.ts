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
  isLoginPage: boolean = true;
  searchbarReset = new EventEmitter<void>();

  @ViewChild('drawer') drawer!: ElementRef;

  constructor(private location: Location, private router: Router) {
    this.setLocationBasedState();
    location.onUrlChange(() => this.setLocationBasedState());
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
    this.isLoginPage = this.location.isCurrentPathEqualTo("/login")
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
    this.router.navigateByUrl("/login").then(this.drawer.nativeElement.close());
  }
}
