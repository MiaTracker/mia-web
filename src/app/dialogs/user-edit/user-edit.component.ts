import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserRegistration} from "../../models/user-registration";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass']
})
export class UserEditComponent {
  protected form: FormGroup;

  constructor(private dialogRef: MatDialogRef<UserEditComponent>) {
    this.form = new FormGroup({
      username: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      password_repeat: new FormControl("", Validators.required),
    });
  }

  protected save(): void {
    if(this.form.invalid) return;
    let registration = new UserRegistration();
    Object.assign(registration, this.form.value);
    this.dialogRef.close(registration);
  }
}
