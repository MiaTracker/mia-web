import {Component, Input} from '@angular/core';
import {SeriesDetails} from "../../models/series-details";
import {SeriesService} from "../../services/series.service";
import {ConfirmationDialogComponent} from "../../dialogs/delete-confirmation/confirmation-dialog.component";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {SeriesMetadataEditComponent} from "../../dialogs/series-metadata-edit/series-metadata-edit.component";

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

  set id(series_id: number) {
    this._series_id = series_id;
    this.getSeries();
  }

  constructor(protected seriesService: SeriesService, private location: Location, private dialog: MatDialog) {
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
          dialogRef.afterClosed().subscribe(result => {
            if(result && this.id) {
              this.seriesService.updateMetadata(result).subscribe({
                complete: () => { this.getSeries() }
              });
            }
          });
        }
      })
    }
  }

  protected deleteSeries(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { prompt: `Do you really want do delete "${this.series?.title}"?` }, restoreFocus: false });
    dialogRef.afterClosed().subscribe(result => {
      if(result && this.id) {
        this.seriesService.deleteSeries(this.id).subscribe(_ => {
          this.location.back();
        })
      }
    });
  }

  protected createTag(event: any): void {
    this.seriesService.createTag(event.name, this._series_id ?? 0).subscribe(_ => this.getSeries());
  }

  protected deleteTag(event: any): void {
    this.seriesService.deleteTag(event.tag.id, this._series_id ?? 0).subscribe(_ => this.getSeries());
  }

  protected createGenre(event: any): void {
    this.seriesService.createGenre(event.name, this._series_id ?? 0).subscribe(_ => this.getSeries());
  }

  protected deleteGenre(event: any): void {
    this.seriesService.deleteGenre(event.tag.id, this._series_id ?? 0).subscribe(_ => this.getSeries());
  }

  protected createTitle(event: any): void {
    this.seriesService.createTitle(event.name, this._series_id ?? 0).subscribe(_ => this.getSeries());
  }

  protected setPrimaryTitle(event: any): void {
    this.seriesService.setPrimaryTitle(event.tag.id, this._series_id ?? 0).subscribe(_ => this.getSeries());
  }

  protected deleteTitle(event: any): void {
    this.seriesService.deleteTitle(event.tag.id, this._series_id ?? 0).subscribe(_ => this.getSeries());
  }
}
