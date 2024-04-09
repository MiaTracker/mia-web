import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SourceType} from "../../enums/source-type";
import {IMediaDetails} from "../../interfaces/imedia-details";
import {SourceEditComponent} from "../../dialogs/source-edit/source-edit.component";
import {Source} from "../../models/source";
import {IMediaService} from "../../interfaces/imedia-service";
import {MatDialog} from "@angular/material/dialog";
import {AppConfig} from "../../config/app.config";

@Component({
  selector: 'app-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.sass']
})
export class MediaDetailsComponent {

  private urlRegEx = new RegExp(
      '^(https?:\\/\\/)?'+ // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
      '(\\#[-a-z\\d_]*)?$','i' // validate fragment locator
  );

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
    const dialogRef = this.dialog.open(SourceEditComponent, {
      data: {
        source: undefined,
        saveFn: (x: Source) => {
          return this.service.createSource(x, this.media?.id ?? 0);
        }
      }
    });
    dialogRef.afterClosed().subscribe(() => this.refresh.emit());
  }

  protected editSource(source: Source): void {
    const dialogRef = this.dialog.open(SourceEditComponent, {
      data: {
        source: source,
        saveFn: (x: Source) => {
          return this.service.updateSource(x, this.media?.id ?? 0)
        },
      },
      autoFocus: "false"
    });
    dialogRef.afterClosed().subscribe(() => this.refresh.emit());
  }

  protected deleteSource(source: Source): void {
    this.service.deleteSource(source.id, this.media?.id ?? 0).subscribe(_ => this.refresh.emit());
  }

  protected openSourceLink(source: Source): void {
    if(this.isUrlValid(source.url)) {
      if(AppConfig.env.env.desktop) {
        // @ts-ignore
        window.__TAURI__.shell.open(source.url);
      } else {
        window.open(source.url);
      }
    }
  }

  protected isUrlValid(url: string): boolean {
    return this.urlRegEx.test(url)
  }
}
