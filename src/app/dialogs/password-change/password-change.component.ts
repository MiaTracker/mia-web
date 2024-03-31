import { Component } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {PasswordChange} from "../../models/password-change";
import {UsersService} from "../../services/users.service";
import {MatDialogRef} from "@angular/material/dialog";
import {AppConfig} from "../../config/app.config";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.sass']
})
export class PasswordChangeComponent {
  protected form: FormGroup;

  constructor(private service: UsersService, private dialogRef: MatDialogRef<PasswordChangeComponent>, private snackBar: MatSnackBar) {
    this.form = new FormGroup({
      oldPassword: new FormControl("", Validators.required),
      newPassword: new FormControl("", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\w\\W]{7,}$")]),
      repeatPassword: new FormControl("", [
        Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\w\\W]{7,}$"),
        (x): ValidationErrors | null => {
          if(!x.pristine && this.form.value.newPassword != x.value) {
            return {notMatching: true};
          }
          return null;
        }
      ])
    });
  }

  protected changePassword(): void {
    if(this.form.invalid) return;
    let val = this.form.value;
    let x = new PasswordChange(val.oldPassword, val.newPassword, val.repeatPassword);
    this.service.changePassword(x).subscribe({
      next: () => {
        this.dialogRef.close()
      },
      error: (err) => {
        if(err.status == 401) {
          this.form.controls["oldPassword"].setErrors({incorrect: true});
          console.log(this.form.controls["oldPassword"].errors)
        } else {
          this.snackBar.open(AppConfig.const.defaultError, undefined, { duration: 3000 })
        }
      }
    });
  }
}
