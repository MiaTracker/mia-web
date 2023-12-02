import {Component, Input, OnInit} from '@angular/core';
import {MediaIndex} from "../../models/media-index.model";
import {AppConfig} from "../../config/app.config";

@Component({
  selector: 'app-index-poster',
  templateUrl: './index-poster.component.html',
  styleUrls: ['./index-poster.component.sass']
})
export class IndexPosterComponent implements OnInit{
  @Input() index!: MediaIndex;
  protected posterSrcset: string[] = [];

  ngOnInit(): void {
    for (const size of AppConfig.const.imagesConfiguration.poster_sizes) {
      if (!size.startsWith("w")) continue;
      this.posterSrcset.push(`${AppConfig.const.imagesConfiguration.secure_base_url + size + this.index.poster_path} ${size.substring(1)}w`);
    }
  }

  protected readonly AppConfig = AppConfig;
}
