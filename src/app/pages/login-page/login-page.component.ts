import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppConfig} from "../../config/app.config";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.sass'],
    standalone: false
})
export class LoginPageComponent {
  usernameFormControl = new FormControl('', { validators: [Validators.required]});
  passwordFormControl = new FormControl('', { validators: [Validators.required]});

  public constructor(private service: UsersService, private router: Router, private snackBar: MatSnackBar) {
  }

  login() {
    if(this.usernameFormControl.errors || this.passwordFormControl.errors) return;
    this.service.login({
      username: this.usernameFormControl.value as string,
      password: this.passwordFormControl.value as string
    }).subscribe({
      next: (_) => { this.router.navigateByUrl('/') },
      error: (err) => {
        if(err.status == 401) {
          this.snackBar.open("Incorrect credentials", undefined, { duration: 3000 });
        }
      }
    })
  }

  changeInstance() {
    if(!AppConfig.env.env.desktop) return;
    AppConfig.run.clearInstance();
    this.router.navigateByUrl("/instance");
  }

  protected readonly AppConfig = AppConfig;
}
