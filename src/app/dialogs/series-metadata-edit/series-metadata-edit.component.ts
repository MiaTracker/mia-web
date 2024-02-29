import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SeriesMetadata} from "../../models/series-metadata";
import {DateTime} from "luxon";

@Component({
  selector: 'app-series-metadata-edit',
  templateUrl: './series-metadata-edit.component.html',
  styleUrls: ['./series-metadata-edit.component.sass']
})
export class SeriesMetadataEditComponent {
  protected form: FormGroup;

  constructor(private dialogRef: MatDialogRef<SeriesMetadataEditComponent>, @Inject(MAT_DIALOG_DATA) protected metadata: SeriesMetadata) {
    this.form = new FormGroup({
      backdrop_path: new FormControl<string | null>(metadata.backdrop_path),
      homepage: new FormControl<string | null>(metadata.homepage),
      tmdb_id: new FormControl<number | null>(metadata.tmdb_id),
      imdb_id: new FormControl<string | null>(metadata.imdb_id),
      title: new FormControl<string | null>(metadata.title),
      overview: new FormControl<string | null>(metadata.overview),
      poster_path: new FormControl<string | null>(metadata.poster_path),
      tmdb_vote_average: new FormControl<number | null>(metadata.tmdb_vote_average),
      original_language: new FormControl<string | null>(metadata.original_language),
      first_air_date: new FormControl<DateTime | null>(metadata.first_air_date),
      number_of_episodes: new FormControl<number | null>(metadata.number_of_episodes),
      number_of_seasons: new FormControl<number | null>(metadata.number_of_seasons),
      status: new FormControl<string | null>(metadata.status),
      type: new FormControl<string | null>(metadata.type)
    });
  }

  protected save(): void {
    if(this.form.invalid) return;
    let x: any = {};
    Object.assign(x, this.form.value);
    x.id = this.metadata.id;
    x.first_air_date = this.form.get("first_air_date")?.value.toFormat('yyyy-MM-dd');
    x.tmdb_id =  this.form.get("tmdb_id")?.value != null ? parseInt(this.form.get("tmdb_id")?.value) : null;
    x.tmdb_vote_average =  this.form.get("tmdb_vote_average")?.value != null ? parseFloat(this.form.get("tmdb_vote_average")?.value) : null;
    x.number_of_episodes =  this.form.get("number_of_episodes")?.value != null ? parseInt(this.form.get("number_of_episodes")?.value) : null;
    x.number_of_seasons =  this.form.get("number_of_seasons")?.value != null ? parseInt(this.form.get("number_of_seasons")?.value) : null;
    this.dialogRef.close(x);
  }
}
