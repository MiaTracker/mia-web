import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-token-generate',
  templateUrl: './token-generate.component.html',
  styleUrls: ['./token-generate.component.sass']
})
export class TokenGenerateComponent {
  protected nameField: FormControl = new FormControl<string|null>(null, Validators.required);

  constructor(private dialogRef: MatDialogRef<TokenGenerateComponent>) {
  }

  protected generate(): void {
    if(this.nameField.invalid) return;
    this.dialogRef.close(this.nameField.value);
  }
}
