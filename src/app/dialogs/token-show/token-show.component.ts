import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TokensComponent} from "../../pages/settings/tokens/tokens.component";
import {AppToken} from "../../models/app-token";
import {DateTime} from "luxon";

@Component({
  selector: 'app-token-show',
  templateUrl: './token-show.component.html',
  styleUrls: ['./token-show.component.sass']
})
export class TokenShowComponent {
  protected readonly DateTime = DateTime;

  constructor(@Inject(MAT_DIALOG_DATA) protected token: AppToken) {
  }

  protected copy() {
    navigator.clipboard.writeText(this.token.token)
  }
}
