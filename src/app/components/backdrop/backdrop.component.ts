import {Component, Input, Output} from '@angular/core';
import {AppConfig} from "../../config/app.config";

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.sass']
})
export class BackdropComponent {
  private _backdrop_path: string | null = null;

  @Input()
  @Output()
  public title: string | null | undefined;

  @Input()
  public get backdrop_path(): string | null | undefined {
    return this._backdrop_path;
  }

  public set backdrop_path(val: string | null | undefined) {
    this._backdrop_path = val ?? null;
    this.recalculateUrls();
  }

  public backdrop_url: string = "";
  public backdrop_srcset: string[] = [];

  public recalculateUrls(): void {
    if(this.backdrop_path) {
      for (const size of AppConfig.const.imagesConfiguration.backdrop_sizes) {
        if (!size.startsWith("w")) continue;
        this.backdrop_srcset.push(`${AppConfig.const.imagesConfiguration.secure_base_url + size + this.backdrop_path} ${size.substring(1)}w`);
      }
      this.backdrop_url = AppConfig.const.imagesConfiguration.secure_base_url + AppConfig.const.imagesConfiguration.backdrop_sizes[AppConfig.const.imagesConfiguration.backdrop_sizes.length - 1] + this.backdrop_path;
    } else {
      this.backdrop_url = AppConfig.env.undefinedImageUrl;
    }
  }
}
