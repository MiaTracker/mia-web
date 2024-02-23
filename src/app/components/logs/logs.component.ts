import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Log} from "../../models/log";
import {IMediaService} from "../../interfaces/imedia-service";
import {LogEditComponent} from "../../dialogs/log-edit/log-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {Source} from "../../models/source";
import {DateTime} from "luxon";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.sass']
})
export class LogsComponent {
  @Input({required: true})
  public media_id!: number;

  @Input({required: true})
  public logs!: Log[];

  @Input({required: true})
  public sources!: Source[]

  @Input({required: true})
  public service!: IMediaService;

  @Output()
  public refresh = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {
  }

  protected addLog(): void {
    let dialogRef = this.dialog.open(LogEditComponent, { data: { sources: this.sources } });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.createLog(result, this.media_id).subscribe({
          complete: () => { this.refresh.emit() }
        });
      }
    });
  }

  protected editLog(log: Log): void {
    let dialogRef = this.dialog.open(LogEditComponent, { data: { log: log, sources: this.sources }, autoFocus: "false" });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.updateLog(result, this.media_id).subscribe({
          complete: () => { this.refresh.emit() }
        });
      }
    });
  }

  protected deleteLog(log: Log): void {
    this.service.deleteLog(log.id, this.media_id).subscribe(_ => this.refresh.emit());
  }

  protected readonly DateTime = DateTime;
}
