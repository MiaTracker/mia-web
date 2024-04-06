import {EventEmitter} from "@angular/core";

export class Signals {
  public static Search = new EventEmitter();
  public static SearchNextPage = new EventEmitter<number>();
}
