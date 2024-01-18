import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Source} from "../../models/source";
import {SourceType} from "../../enums/source-type";

interface Type {
  value: SourceType,
  viewValue: string;
}

@Component({
  selector: 'app-source-edit',
  templateUrl: './source-edit.component.html',
  styleUrls: ['./source-edit.component.sass']
})
export class SourceEditComponent {
  protected form: FormGroup;
  protected types: Type[] = [
    { value: SourceType.Web, viewValue: "Web" },
    { value: SourceType.Torrent, viewValue: "Torrent" },
    { value: SourceType.Jellyfin, viewValue: "Jellyfin" }
  ];

  constructor(private dialogRef: MatDialogRef<SourceEditComponent>, @Inject(MAT_DIALOG_DATA) protected source: Source | undefined) {
    this.form = new FormGroup({
      name: new FormControl(source?.name, Validators.required),
      type: new FormControl<Type | null>(this.types.find(x => x.value == source?.type) ?? null, Validators.required),
      url: new FormControl(source?.url)
    });
  }

  protected save(): void {
    if(this.form.invalid) return;
    let source = this.source ?? new Source();
    Object.assign(source, this.form.value);
    source.type = this.form.get("type")?.value.value;
    this.dialogRef.close(source);
  }
}
