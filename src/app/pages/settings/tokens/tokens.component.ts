import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AppTokensService} from "../../../services/app-tokens.service";
import {DeleteConfirmationComponent} from "../../../dialogs/delete-confirmation/delete-confirmation.component";
import {TokenGenerateComponent} from "../../../dialogs/token-generate/token-generate.component";
import {AppTokenIndex} from "../../../models/app-token-index";
import {DateTime} from "luxon";
import {TokenShowComponent} from "../../../dialogs/token-show/token-show.component";

@Component({
    selector: 'app-tokens',
    templateUrl: './tokens.component.html',
    styleUrls: ['./tokens.component.sass'],
    standalone: false
})
export class TokensComponent {
  protected tokens: AppTokenIndex[] = [];

  protected displayedColumns = ['name', 'generated', 'actions']

  constructor(private service: AppTokensService, private dialog: MatDialog) {
    this.getTokens();
  }

  private getTokens(): void {
    this.service.index().subscribe(u => this.tokens = u);
  }

  protected createToken(): void {
    let dialogRef = this.dialog.open(TokenGenerateComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.dialog.open(TokenShowComponent, { data: result, restoreFocus: false });
      this.getTokens()
    });
  }

  protected revokeToken(token: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, { data: { prompt: `Do you really want do revoke token '"${token}"'?` }, restoreFocus: false });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.revoke(token).subscribe(_ => {
          this.getTokens()
        })
      }
    });
  }

  protected readonly DateTime = DateTime;
}
