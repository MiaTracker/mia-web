import {EventEmitter} from "@angular/core";

export class Signals {
  public static MovieIndexUpdated = new EventEmitter<void>();
  public static Search = new EventEmitter();
}
