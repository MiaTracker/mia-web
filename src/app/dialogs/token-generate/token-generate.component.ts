import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {AppTokensService} from "../../services/app-tokens.service";

@Component({
  selector: 'app-token-generate',
  templateUrl: './token-generate.component.html',
  styleUrls: ['./token-generate.component.sass']
})
export class TokenGenerateComponent {
  protected nameField: FormControl = new FormControl<string|null>(null, Validators.required);

  constructor(private dialogRef: MatDialogRef<TokenGenerateComponent>, private service: AppTokensService) {
  }

  protected generate(): void {
    if(this.nameField.invalid) return;
    this.service.generate(this.nameField.value).subscribe({
      next: x => {
        this.dialogRef.close(x);
      },
      error: err => {
        for (const e of err.error) {
          if(e.key == "AppTokenNameAlreadyExists")
            this.nameField.setErrors({alreadyExists: true});
          else console.log(err);
        }
      }
    })

  }
}
