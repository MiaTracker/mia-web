import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SeriesMetadata} from "../../models/series-metadata";
import {DateTime} from "luxon";
import {LanguageIndex} from "../../models/language-index";
import {map, Observable, startWith} from "rxjs";
import {MediaService} from "../../services/media.service";
import {SeriesService} from "../../services/series.service";

@Component({
  selector: 'app-series-metadata-edit',
  templateUrl: './series-metadata-edit.component.html',
  styleUrls: ['./series-metadata-edit.component.sass']
})
export class SeriesMetadataEditComponent {
  protected form: FormGroup;

  protected validLanguages: LanguageIndex[] = [];
  protected filteredLanguages: Observable<string[]>;

  constructor(private dialogRef: MatDialogRef<SeriesMetadataEditComponent>, @Inject(MAT_DIALOG_DATA) protected metadata: SeriesMetadata, private seriesService: SeriesService, private mediaService: MediaService) {
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
      first_air_date: new FormControl<DateTime | null>(metadata.first_air_date),
      number_of_episodes: new FormControl<number | null>(metadata.number_of_episodes),
      number_of_seasons: new FormControl<number | null>(metadata.number_of_seasons),
      status: new FormControl<string | null>(metadata.status),
      type: new FormControl<string | null>(metadata.type)
    });

    mediaService.languages().subscribe({
      next: (languages) => {
        this.validLanguages = languages;
        this.form.get("original_language")!.setValue(this.validLanguages.find((x) => x.iso_639_1 == metadata.original_language)?.english_name || console.log("Not found"));
      }
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
    x.first_air_date = this.form.get("first_air_date")?.value.toFormat('yyyy-MM-dd');
    x.tmdb_id =  this.form.get("tmdb_id")?.value != null ? parseInt(this.form.get("tmdb_id")?.value) : null;
    x.tmdb_vote_average =  this.form.get("tmdb_vote_average")?.value != null ? parseFloat(this.form.get("tmdb_vote_average")?.value) : null;
    x.number_of_episodes =  this.form.get("number_of_episodes")?.value != null ? parseInt(this.form.get("number_of_episodes")?.value) : null;
    x.number_of_seasons =  this.form.get("number_of_seasons")?.value != null ? parseInt(this.form.get("number_of_seasons")?.value) : null;
    x.original_language = this.form.get('original_language')?.value != null ? this.validLanguages.find(x => x.english_name == this.form.get('original_language')?.value)?.iso_639_1 : null;

    this.seriesService.updateMetadata(x).subscribe({
      error: (err) => {
        console.log(err);
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
