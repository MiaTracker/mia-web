import {Component, Input, OnInit} from '@angular/core';
import {MediaIndex} from "../../models/media-index.model";
import {AppConstants} from "../../constants/app.constants";

@Component({
  selector: 'app-index-poster',
  templateUrl: './index-poster.component.html',
  styleUrls: ['./index-poster.component.sass']
})
export class IndexPosterComponent implements OnInit{
  @Input() index!: MediaIndex;
  protected readonly AppConstants = AppConstants;
  protected posterSrcset: string[] = [];

  ngOnInit(): void {
    for (const size of AppConstants.ImagesConfiguration.poster_sizes) {
      if (!size.startsWith("w")) continue;
      this.posterSrcset.push(`${AppConstants.ImagesConfiguration.secure_base_url + size + this.index.poster_path} ${size.substring(1)}w`);
    }
  }
}
