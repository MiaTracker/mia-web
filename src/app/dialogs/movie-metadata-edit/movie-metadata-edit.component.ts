import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MovieMetadata} from "../../models/movie-metadata";
import {FormControl, FormGroup} from "@angular/forms";
import {DateTime} from "luxon";

@Component({
  selector: 'app-movie-metadata-edit',
  templateUrl: './movie-metadata-edit.component.html',
  styleUrls: ['./movie-metadata-edit.component.sass']
})
export class MovieMetadataEditComponent {
  protected form: FormGroup;

  constructor(private dialogRef: MatDialogRef<MovieMetadataEditComponent>, @Inject(MAT_DIALOG_DATA) protected metadata: MovieMetadata) {
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
      release_date: new FormControl<DateTime | null>(metadata.release_date),
      runtime: new FormControl<number | null>(metadata.runtime),
      status: new FormControl<string | null>(metadata.status),
    });
  }

  protected save(): void {
    if(this.form.invalid) return;
    let x: any = {};
    Object.assign(x, this.form.value);
    x.id = this.metadata.id;
    x.release_date = x.release_date.toFormat('yyyy-MM-dd');
    x.tmdb_id =  this.form.get("tmdb_id")?.value != null ? parseInt(this.form.get("tmdb_id")?.value) : null;
    x.tmdb_vote_average =  this.form.get("tmdb_vote_average")?.value != null ? parseFloat(this.form.get("tmdb_vote_average")?.value) : null;
    x.runtime =  this.form.get("runtime")?.value != null ? parseInt(this.form.get("runtime")?.value) : null;
    this.dialogRef.close(x);
  }
}
