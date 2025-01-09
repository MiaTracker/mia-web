import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Source} from "../../models/source";
import {SourceType} from "../../enums/source-type";
import {Observable} from "rxjs";

interface Type {
  value: SourceType,
  viewValue: string;
}

@Component({
    selector: 'app-source-edit',
    templateUrl: './source-edit.component.html',
    styleUrls: ['./source-edit.component.sass'],
    standalone: false
})
export class SourceEditComponent {
  protected form: FormGroup;
  protected types: Type[] = [
    { value: SourceType.Web, viewValue: "Web" },
    { value: SourceType.Torrent, viewValue: "Torrent" },
    { value: SourceType.Jellyfin, viewValue: "Jellyfin" }
  ];

  constructor(private dialogRef: MatDialogRef<SourceEditComponent>, @Inject(MAT_DIALOG_DATA) protected data: { source: Source | undefined, saveFn: (x: Source) => Observable<Object> }) {
    this.form = new FormGroup({
      name: new FormControl(data.source?.name, Validators.required),
      type: new FormControl<Type | null>(this.types.find(x => x.value == data.source?.type) ?? null, Validators.required),
      url: new FormControl(data.source?.url, Validators.required)
    });
  }

  protected save(): void {
    if(this.form.invalid) return;
    let source = this.data.source ?? new Source();
    Object.assign(source, this.form.value);
    source.type = this.form.get("type")?.value.value;
    this.data.saveFn(source).subscribe({
      error: err => {
        for (const e of err.error) {
          if(e.key == "SourceNameAlreadyExists")
            this.form.get("name")?.setErrors({alreadyExists: true});
          else console.log(err);
        }
      },
      complete: () => {
        this.dialogRef.close();
      }
    });
  }
}
