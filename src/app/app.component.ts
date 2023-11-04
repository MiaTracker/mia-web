import {Component, Renderer2} from '@angular/core';
import {Location} from "@angular/common";
import {Signal} from "typed-signals";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  isBasePath: boolean = false;
  searchbarReset = new Signal<() => void>();

  constructor(private location: Location) {
    this.setIsBasePath();
    location.onUrlChange(() => this.setIsBasePath());
  }

  back(): void {
    this.location.back();
  }

  setIsBasePath(): void {
    this.isBasePath = this.location.isCurrentPathEqualTo("/");
  }

  addMedia(_: any): void {
    this.searchbarReset.emit();
  }
}
