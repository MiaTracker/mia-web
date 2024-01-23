import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MediaIndex} from "../../models/media-index.model";
import {AppConfig} from "../../config/app.config";
import {MediaType} from "../../enums/media-type.enum";
import {ExternalIndex} from "../../models/external-index";

@Component({
  selector: 'app-index-poster',
  templateUrl: './index-poster.component.html',
  styleUrls: ['./index-poster.component.sass']
})
export class IndexPosterComponent implements OnInit{
  private _index!: MediaIndex | ExternalIndex;

  @Input({required: true})
  public get index(): MediaIndex | ExternalIndex {
    return this._index;
  }
  public set index(index: MediaIndex | ExternalIndex) {
    this._index = index;
    this.internal = index instanceof MediaIndex ? index as MediaIndex : null;
  }

  @Input({required: true}) showType!: boolean;

  @Output()
  public createExternal = new EventEmitter<ExternalIndex>();

  protected posterSrcset: string[] = [];
  protected internal: MediaIndex | null = null;

  ngOnInit(): void {
    for (const size of AppConfig.const.imagesConfiguration.poster_sizes) {
      if (!size.startsWith("w")) continue;
      this.posterSrcset.push(`${AppConfig.const.imagesConfiguration.secure_base_url + size + this.index.poster_path} ${size.substring(1)}w`);
    }
  }

  protected readonly AppConfig = AppConfig;
  protected readonly MediaType = MediaType;

  protected create() {
    if(this.index instanceof ExternalIndex)
      this.createExternal.emit(this.index);
  }
}
