import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {Image, Images} from "../../models/images";
import {AppConfig} from "../../config/app.config";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ImagesUpdate} from "../../models/images-update";

@Component({
    selector: 'app-images-select',
    standalone: true,
    imports: [
        NgForOf,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        NgIf
    ],
    templateUrl: './images-select.component.html',
    styleUrl: './images-select.component.sass'
})
export class ImagesSelectComponent {
  private currentPoster: Image | null;
  private currentBackdrop: Image | null;

  protected selectedPoster: Image | null;
  protected selectedBackdrop: Image | null;

  constructor(private dialogRef: MatDialogRef<ImagesSelectComponent>, @Inject(MAT_DIALOG_DATA) protected data: { images: Images, saveFn: (x: ImagesUpdate) => Observable<Object> }) {
    this.currentPoster = data.images.posters.find(x => x.current) ?? null;
    this.currentBackdrop = data.images.backdrops.find(x => x.current) ?? null;
    this.selectedPoster = this.currentPoster;
    this.selectedBackdrop = this.currentBackdrop;
    console.log(data.images);
  }

  protected save(): void {
    this.data.saveFn(new ImagesUpdate(
      this.currentBackdrop != this.selectedBackdrop ? this.selectedBackdrop?.file_path ?? null : null,
      this.currentPoster != this.selectedPoster ? this.selectedPoster?.file_path ?? null : null,
    )).subscribe({
      error: err => {
        console.log(err);
      },
      complete: () => {
        this.dialogRef.close();
      }
    });
  }

  protected posterSrcSet(filePath: string): string[] {
    if(filePath == null) return [];
    let srcset: string[] = [];
    for (const size of AppConfig.const.imagesConfiguration.poster_sizes) {
      if (!size.startsWith("w")) continue;
      srcset.push(`${AppConfig.const.imagesConfiguration.secure_base_url + size + filePath} ${size.substring(1)}w`);
    }
    return srcset
  }

  protected backdropSrcSet(filePath: string): string[] {
    if(filePath == null) return [];
    let srcset: string[] = [];
    for (const size of AppConfig.const.imagesConfiguration.backdrop_sizes) {
      if (!size.startsWith("w")) continue;
      srcset.push(`${AppConfig.const.imagesConfiguration.secure_base_url + size + filePath} ${size.substring(1)}w`);
    }
    return srcset
  }
}
