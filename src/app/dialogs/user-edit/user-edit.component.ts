import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UserRegistration} from "../../models/user-registration";
import {UsersService} from "../../services/users.service";

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.sass'],
    standalone: false
})
export class UserEditComponent {
  protected form: FormGroup;

  constructor(private dialogRef: MatDialogRef<UserEditComponent>, private service: UsersService) {
    this.form = new FormGroup({
      username: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.pattern("^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])$")]),
      password: new FormControl("", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\w\\W]{7,}$")]),
      password_repeat: new FormControl("", [Validators.required, (x): ValidationErrors | null => {
        if(!x.pristine && x.value != this.form.get('password')?.value)
          return { notMatching: true };
        return null;
      }]),
    });
  }

  protected save(): void {
    if(this.form.invalid) return;
    let registration = new UserRegistration();
    Object.assign(registration, this.form.value);
    this.service.register(registration).subscribe({
      error: (err) => {
        for (const e of err.error) {
          if(e.key == "SignUpAccountWithThisEmailAlreadyExists")
            this.form.get('email')?.setErrors({alreadyExists: true});
          else if(e.key == "SignUpUsernameAlreadyTaken")
            this.form.get('username')?.setErrors({alreadyTaken: true});
          else console.log(err);
        }
      },
      complete: () => {
        this.dialogRef.close();
      }
    });
  }
}
