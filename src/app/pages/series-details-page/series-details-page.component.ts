import {Component, Input} from '@angular/core';
import {SeriesDetails} from "../../models/series-details";
import {SeriesService} from "../../services/series.service";

@Component({
  selector: 'app-series-movie-details-page',
  templateUrl: './series-details-page.component.html',
  styleUrls: ['./series-details-page.component.sass']
})
export class SeriesDetailsPageComponent {
  public series: SeriesDetails | undefined;

  protected editable: boolean = false;

  @Input()
  set id(series_id: number) {
    this.seriesService.getDetails(series_id).subscribe(s => {
      this.series = s;
    })
  }

  constructor(private seriesService: SeriesService) {
  }
}
