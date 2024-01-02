import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation.component.sass']
})
export class ConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) protected data: { prompt: string }) {
  }
}
