import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SeriesMetadata} from "../../models/series-metadata";

@Component({
  selector: 'app-series-metadata-edit',
  templateUrl: './series-metadata-edit.component.html',
  styleUrls: ['./series-metadata-edit.component.sass']
})
export class SeriesMetadataEditComponent {
  protected form: FormGroup;

  constructor(private dialogRef: MatDialogRef<SeriesMetadataEditComponent>, @Inject(MAT_DIALOG_DATA) protected metadata: SeriesMetadata) {
    this.form = new FormGroup({
      backdrop_path: new FormControl(metadata.backdrop_path),
      homepage: new FormControl(metadata.homepage),
      tmdb_id: new FormControl(metadata.tmdb_id),
      imdb_id: new FormControl(metadata.imdb_id),
      title: new FormControl(metadata.title),
      overview: new FormControl(metadata.overview),
      poster_path: new FormControl(metadata.poster_path),
      tmdb_vote_average: new FormControl(metadata.tmdb_vote_average),
      original_language: new FormControl(metadata.original_language),
      first_air_date: new FormControl(metadata.first_air_date),
      number_of_episodes: new FormControl(metadata.number_of_episodes),
      number_of_seasons: new FormControl(metadata.number_of_seasons),
      status: new FormControl(metadata.status),
      type: new FormControl(metadata.type)
    });
  }

  protected save(): void {
    if(this.form.invalid) return;
    let x: any = {};
    Object.assign(x, this.form.value);
    x.id = this.metadata.id;
    x.first_air_date = x.first_air_date.toFormat('yyyy-MM-dd');
    this.dialogRef.close(x);
  }
}
