import {Component} from '@angular/core';
import {Location} from "@angular/common";
import {Signal} from "typed-signals";
import {MoviesService} from "./services/movies.service";
import {Signals} from "./infrastructure/signals";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  isBasePath: boolean = false;
  isLoginPage: boolean = true;
  searchbarReset = new Signal<() => void>();

  constructor(private location: Location, private service: MoviesService) {
    this.setIsLoginPage();
    this.setIsBasePath();
    location.onUrlChange(() => this.setIsBasePath());
    location.onUrlChange(() => this.setIsLoginPage());
  }

  back(): void {
    this.location.back();
  }

  setIsBasePath(): void {
    this.isBasePath = this.location.isCurrentPathEqualTo("/");
  }

  setIsLoginPage(): void {
    this.isLoginPage = this.location.isCurrentPathEqualTo("/login")
  }

  addMedia(event: any): void {
    let id = Number.parseInt(event.value);
    this.service.createMovie(id).subscribe(() => {
      this.searchbarReset.emit();
      Signals.MovieIndexUpdated.emit();
    })
  }
}
