import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PasswordChange} from "../../models/password-change";
import {UsersService} from "../../services/users.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.sass']
})
export class PasswordChangeComponent {
  protected form: FormGroup;

  constructor(private service: UsersService, private dialogRef: MatDialogRef<PasswordChangeComponent>) {
    this.form = new FormGroup({
      oldPassword: new FormControl("", Validators.required),
      newPassword: new FormControl("", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\w\\W]{7,}$")]),
      repeatPassword: new FormControl("", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\w\\W]{7,}$")])
    });
  }

  protected changePassword(): void {
    if(this.form.invalid) return;
    let val = this.form.value;
    let x = new PasswordChange(val.oldPassword, val.newPassword, val.repeatPassword);
    this.service.changePassword(x).subscribe({
      next: () => {
        this.dialogRef.close()
      }
    });
  }
}
