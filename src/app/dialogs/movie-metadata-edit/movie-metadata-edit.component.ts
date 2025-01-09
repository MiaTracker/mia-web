import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MovieMetadata} from "../../models/movie-metadata";
import {FormControl, FormGroup, ValidationErrors} from "@angular/forms";
import {DateTime} from "luxon";
import {MoviesService} from "../../services/movies.service";
import {MediaService} from "../../services/media.service";
import {LanguageIndex} from "../../models/language-index";
import {map, Observable, startWith} from "rxjs";

@Component({
    selector: 'app-movie-metadata-edit',
    templateUrl: './movie-metadata-edit.component.html',
    styleUrls: ['./movie-metadata-edit.component.sass'],
    standalone: false
})
export class MovieMetadataEditComponent {
  protected form: FormGroup;

  protected validLanguages: LanguageIndex[] = [];
  protected filteredLanguages: Observable<string[]>;

  constructor(private dialogRef: MatDialogRef<MovieMetadataEditComponent>, @Inject(MAT_DIALOG_DATA) protected metadata: MovieMetadata, private moviesService: MoviesService, private mediaService: MediaService) {
    this.form = new FormGroup({
      homepage: new FormControl<string | null>(metadata.homepage),
      imdb_id: new FormControl<string | null>(metadata.imdb_id),
      title: new FormControl<string | null>(metadata.title),
      overview: new FormControl<string | null>(metadata.overview),
      original_language: new FormControl<string | null>(null, [(x): ValidationErrors | null => {
        if(!x.pristine && !this.validLanguages.find(y => y.english_name == x.value)) {
          return { notValid: true };
        }
        return null;
      }]),
      release_date: new FormControl<DateTime | null>(metadata.release_date),
      runtime: new FormControl<number | null>(metadata.runtime, (x): ValidationErrors | null => {
        if(!x.pristine && !(x.value as number >= 0))
          return { negative: true };
        return null;
      }),
      status: new FormControl<string | null>(metadata.status),
    });

    mediaService.languages().subscribe({
      next: (languages) => {
        this.validLanguages = languages;
        this.form.get("original_language")!.setValue(this.validLanguages.find((x) => x.iso_639_1 == metadata.original_language)?.english_name || console.log("Not found"));
      }
    });

    this.filteredLanguages = this.form.get("original_language")!.valueChanges.pipe(
      startWith(null),
      map(value => this.filterLanguages(value))
    )
  }

  protected save(): void {
    if(this.form.invalid) return;
    let x: any = {};
    Object.assign(x, this.form.value);
    x.id = this.metadata.id;
    x.release_date = x.release_date.toFormat('yyyy-MM-dd');
    x.runtime = this.form.get("runtime")?.value != null ? parseInt(this.form.get("runtime")?.value) : null;
    x.original_language = this.form.get('original_language')?.value != null ? this.validLanguages.find(x => x.english_name == this.form.get('original_language')?.value)?.iso_639_1 : null;

    this.moviesService.updateMetadata(x).subscribe({
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        this.dialogRef.close();
      }
    });
  }

  private filterLanguages(value: string | null): string[] {
    const val = value?.toLowerCase() || '';
    return this.validLanguages.filter(o => o.english_name.toLowerCase().includes(val) || o.iso_639_1.toLowerCase().includes(val))
      .map(x => x.english_name);
  }
}
