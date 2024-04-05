import {Component, Input} from '@angular/core';
import {SeriesDetails} from "../../models/series-details";
import {SeriesService} from "../../services/series.service";
import {DeleteConfirmationComponent} from "../../dialogs/delete-confirmation/delete-confirmation.component";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {SeriesMetadataEditComponent} from "../../dialogs/series-metadata-edit/series-metadata-edit.component";
import {WatchlistService} from "../../services/watchlist.service";
import {ImagesSelectComponent} from "../../dialogs/images-select/images-select.component";
import {ImagesUpdate} from "../../models/images-update";

@Component({
  selector: 'app-series-movie-details-page',
  templateUrl: './series-details-page.component.html',
  styleUrls: ['./series-details-page.component.sass']
})
export class SeriesDetailsPageComponent {
  private _series_id: number | undefined;

  public series: SeriesDetails | undefined;

  protected editable: boolean = true;

  @Input()
  get id(): number | undefined {
    return this._series_id;
  }

  set id(series_id: string) {
    this._series_id = parseInt(series_id);
    this.getSeries();
  }

  constructor(protected seriesService: SeriesService, private watchlistService: WatchlistService, private location: Location, private dialog: MatDialog) {
  }

  protected getSeries() {
    if(this.id) {
      this.seriesService.getDetails(this.id).subscribe(s => {
        this.series = s;
      });
    }
  }

  protected editMetadata(): void {
    if(this.id) {
      this.seriesService.getMetadata(this.id).subscribe({
        next: (data) => {
          let dialogRef = this.dialog.open(SeriesMetadataEditComponent, { data: data, restoreFocus: false, autoFocus: "false" });
          dialogRef.afterClosed().subscribe(_ => {
            this.getSeries()
          });
        }
      })
    }
  }

  protected selectImages(): void {
    if(this.id != null) {
      this.seriesService.images(this.id).subscribe(imgs => {
        const dialogRef = this.dialog.open(ImagesSelectComponent, {
          data: { images: imgs, saveFn: (x: ImagesUpdate) => { return this.seriesService.updateImages(this.id ?? 0, x) }},
          restoreFocus: false
        });
        dialogRef.afterClosed().subscribe(() => this.getSeries());
      })
    }
  }

  protected deleteSeries(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, { data: { prompt: `Do you really want do delete "${this.series?.title}"?` }, restoreFocus: false });
    dialogRef.afterClosed().subscribe(result => {
      if(result && this.id) {
        this.seriesService.deleteSeries(this.id).subscribe(_ => {
          this.location.back();
        })
      }
    });
  }

  protected addToWatchlist(): void {
    this.watchlistService.add(this.id ?? 0).subscribe(() => this.getSeries());
  }

  protected removeFromWatchlist(): void {
    this.watchlistService.remove(this.id ?? 0).subscribe(() => this.getSeries());
  }

    protected readonly Math = Math;
}
