import { Component } from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {MatDialog} from "@angular/material/dialog";
import {UserEditComponent} from "../../../dialogs/user-edit/user-edit.component";
import {UserIndex} from "../../../models/user-index";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent {
  protected users: UserIndex[] = [];

  protected displayedColumns = ['username', 'email', 'admin']

  constructor(private service: UsersService, private dialog: MatDialog) {
    this.getUsers();
  }

  private getUsers(): void {
    this.service.index().subscribe(u => this.users = u);
  }

  protected createUser(): void {
    let dialogRef = this.dialog.open(UserEditComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.register(result).subscribe({
          complete: () => { this.getUsers() }
        });
      }
    });
  }
}
