import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Source} from "../../models/source";
import {Log, LogCreate} from "../../models/log";

@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.component.html',
  styleUrls: ['./log-edit.component.sass']
})
export class LogEditComponent {
  protected form: FormGroup;

  constructor(private dialogRef: MatDialogRef<LogEditComponent>, @Inject(MAT_DIALOG_DATA) protected data: { log: Log | undefined, sources: Source[] }) {
    this.form = new FormGroup({
      date: new FormControl<Date | null>(data.log?.date ?? null, Validators.required),
      source: new FormControl<string | null>(data.sources.find((x) => x.name == data.log?.source)?.name ?? null, Validators.required),
      stars: new FormControl<number | null>(data.log?.stars ?? null, [Validators.min(0), Validators.max(10)]),
      completed: new FormControl<boolean>(data.log?.completed ?? true, Validators.required),
      comment: new FormControl<string | null>(data.log?.comment ?? null)
    });
  }

  protected save(): void {
    if(this.form.invalid) return;
    let log = this.data?.log ?? new LogCreate();
    Object.assign(log, this.form.value);
    log.date = this.form.get("date")?.value.toFormat('yyyy-MM-dd');
    this.dialogRef.close(log);
  }
}
