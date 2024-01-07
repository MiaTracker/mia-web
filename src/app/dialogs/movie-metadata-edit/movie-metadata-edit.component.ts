import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MovieMetadata} from "../../models/movie-metadata";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-movie-metadata-edit',
  templateUrl: './movie-metadata-edit.component.html',
  styleUrls: ['./movie-metadata-edit.component.sass']
})
export class MovieMetadataEditComponent {
  protected form: FormGroup;

  constructor(private dialogRef: MatDialogRef<MovieMetadataEditComponent>, @Inject(MAT_DIALOG_DATA) protected metadata: MovieMetadata) {
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
      release_date: new FormControl(metadata.release_date),
      runtime: new FormControl(metadata.runtime),
      status: new FormControl(metadata.status),
    });
  }

  protected save(): void {
    if(this.form.invalid) return;
    let x: any = {};
    Object.assign(x, this.form.value);
    x.id = this.metadata.id;
    x.release_date = x.release_date.toFormat('yyyy-MM-dd');
    this.dialogRef.close(x);
  }
}
