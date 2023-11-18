import {Component, Input} from '@angular/core';
import {Log} from "../../models/log";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.sass']
})
export class LogComponent {
  @Input()
  public log!: Log
  @Input()
  public editable: boolean = false

  protected readonly formatDate = formatDate;
}
