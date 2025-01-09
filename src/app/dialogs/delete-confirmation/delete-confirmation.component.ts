import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
    selector: 'app-delete-confirmation',
    templateUrl: './delete-confirmation.component.html',
    styleUrls: ['./delete-confirmation.component.sass'],
    standalone: false
})
export class DeleteConfirmationComponent {
  constructor(@Inject(MAT_DIALOG_DATA) protected data: { prompt: string }) {
  }
}
