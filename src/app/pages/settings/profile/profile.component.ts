import { Component } from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {UserProfile} from "../../../models/user-profile";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {PasswordChangeComponent} from "../../../dialogs/password-change/password-change.component";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.sass'],
    standalone: false
})
export class ProfileComponent {
  protected profile: UserProfile | undefined;

  protected form: FormGroup;

  public constructor(private service: UsersService, private dialog: MatDialog) {
    this.form = new FormGroup({
      username: new FormControl<string>(""),
      email: new FormControl<string>(""),
      admin: new FormControl<boolean>(false)
    });
    this.getProfile();
  }

  protected changePassword(): void {
    this.dialog.open(PasswordChangeComponent);
  }

  private getProfile(): void {
    this.service.profile().subscribe(profile => {
      this.form = new FormGroup({
        username: new FormControl<string>(profile.username, Validators.required),
        email: new FormControl<string>(profile.email, [Validators.required, Validators.email]),
        admin: new FormControl<boolean>(profile.admin)
      });
      this.form.disable();
    });
  }
}
