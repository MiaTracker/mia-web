import {Component, Input} from '@angular/core';
import {AppConfig} from "../../config/app.config";

@Component({
    selector: 'app-details-poster',
    templateUrl: './details-poster.component.html',
    styleUrls: ['./details-poster.component.sass'],
    standalone: false
})
export class DetailsPosterComponent {
  private _poster_path: string | null = null;

  protected posterSrcset: string[] = [];
  protected posterUrl: string | undefined = undefined;

  @Input()
  public get poster_path(): string | null | undefined {
    return this._poster_path;
  }

  public set poster_path(val: string | null | undefined) {
    this._poster_path = val ?? null;
    this.recalculateUrls();

  }

  private recalculateUrls() {
    if(this.poster_path) {
      for (const size of AppConfig.const.imagesConfiguration.poster_sizes) {
        if (!size.startsWith("w")) continue;
        this.posterSrcset.push(`${AppConfig.const.imagesConfiguration.secure_base_url + size + this.poster_path} ${size.substring(1)}w`);
      }
      this.posterUrl = AppConfig.const.imagesConfiguration.secure_base_url + AppConfig.const.imagesConfiguration.poster_sizes[AppConfig.const.imagesConfiguration.poster_sizes.length - 1] + this.poster_path;
    } else {
      this.posterUrl = AppConfig.env.undefinedImageUrl;
    }
  }
}
