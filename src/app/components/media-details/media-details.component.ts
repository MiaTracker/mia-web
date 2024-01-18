import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SourceType} from "../../enums/source-type";
import {IMediaDetails} from "../../interfaces/imedia-details";
import {SourceEditComponent} from "../../dialogs/source-edit/source-edit.component";
import {Source} from "../../models/source";
import {IMediaService} from "../../interfaces/imedia-service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.sass']
})
export class MediaDetailsComponent {

  protected readonly SourceType = SourceType;

  @Input()
  public media: IMediaDetails | undefined;

  @Input({ required: true })
  public service!: IMediaService;

  @Input()
  public editable: boolean = true;

  @Output()
  public refresh = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {
  }


  protected createTag(event: any): void {
    this.service.createTag(event.name, this.media?.id ?? 0).subscribe(_ => this.refresh.emit());
  }

  protected deleteTag(event: any): void {
    this.service.deleteTag(event.tag.id, this.media?.id ?? 0).subscribe(_ => this.refresh.emit());
  }

  protected createGenre(event: any): void {
    this.service.createGenre(event.name, this.media?.id ?? 0).subscribe(_ => this.refresh.emit());
  }

  protected deleteGenre(event: any): void {
    this.service.deleteGenre(event.tag.id, this.media?.id ?? 0).subscribe(_ => this.refresh.emit());
  }

  protected createTitle(event: any): void {
    this.service.createTitle(event.name, this.media?.id ?? 0).subscribe(_ => this.refresh.emit());
  }

  protected setPrimaryTitle(event: any): void {
    this.service.setPrimaryTitle(event.tag.id, this.media?.id ?? 0).subscribe(_ => this.refresh.emit());
  }

  protected deleteTitle(event: any): void {
    this.service.deleteTitle(event.tag.id, this.media?.id ?? 0).subscribe(_ => this.refresh.emit());
  }

  protected addSource(): void {
    let dialogRef = this.dialog.open(SourceEditComponent, { data: undefined, autoFocus: "false" });
    dialogRef.afterClosed().subscribe(result => {
      if(result && this.media) {
        this.service.createSource(result, this.media?.id ?? 0).subscribe({
          complete: () => { this.refresh.emit() }
        });
      }
    });
  }

  protected editSource(source: Source): void {
    let dialogRef = this.dialog.open(SourceEditComponent, { data: source, autoFocus: "false" });
    dialogRef.afterClosed().subscribe(result => {
      if(result && this.media) {
        this.service.updateSource(result, this.media?.id ?? 0).subscribe({
          complete: () => { this.refresh.emit() }
        })
      }
    })
  }

  protected deleteSource(source: Source): void {
    this.service.deleteSource(source.id, this.media?.id ?? 0).subscribe(_ => this.refresh.emit());
  }

  protected openSourceLink(source: Source): void {
    let prefix = "";
    if(!source.url.startsWith('https://') && !source.url.startsWith('http://')) prefix = "https://"
    window.open(prefix + source.url);
  }
}