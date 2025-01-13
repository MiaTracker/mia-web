import { Component } from '@angular/core';
import {UsersService} from "../../../services/users.service";
import {MatDialog} from "@angular/material/dialog";
import {UserEditComponent} from "../../../dialogs/user-edit/user-edit.component";
import {UserIndex} from "../../../models/user-index";
import {DeleteConfirmationComponent} from "../../../dialogs/delete-confirmation/delete-confirmation.component";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.sass'],
    standalone: false
})
export class UsersComponent {
  protected users: UserIndex[] = [];

  protected displayedColumns = ['username', 'email', 'admin', 'actions']

  constructor(private service: UsersService, private dialog: MatDialog) {
    this.getUsers();
  }

  private getUsers(): void {
    this.service.index().subscribe(u => this.users = u);
  }

  protected createUser(): void {
    let dialogRef = this.dialog.open(UserEditComponent);
    dialogRef.afterClosed().subscribe(_ => {
      this.getUsers()
    });
  }

  protected deleteUser(user: UserIndex): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, { data: { prompt: `Do you really want do delete user '"${user.username}"'?` }, restoreFocus: false, minWidth: undefined });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.delete(user.uuid).subscribe(_ => {
          this.getUsers()
        })
      }
    });
  }
}
