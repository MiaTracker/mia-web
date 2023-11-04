import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Signal, SignalConnection} from "typed-signals";

@Component({
  selector: 'app-add-searchbar',
  templateUrl: './add-searchbar.component.html',
  styleUrls: ['./add-searchbar.component.sass']
})
export class AddSearchbarComponent {
  connection: SignalConnection | undefined;

  @Input()
  set reset(val: Signal<() => void>) {
    this.connection?.disconnect();
    this.connection = val.connect(() => this.onReset());
  }

  @Output() onAction = new EventEmitter();

  @ViewChild("searchbarInput") searchbarInput!: ElementRef;
  open: boolean = false;
  enteredText: string = "";
  btnFocused: boolean = false;
  loading: boolean = false;

  addBtnClicked(): void {
    if (!this.open) {
      this.open = true;
      this.searchbarInput.nativeElement.focus();
    } else if(this.enteredText) {
      this.onAction.emit({ value: this.enteredText });
    } else {
      this.searchbarInput.nativeElement.focus();
    }
  }

  searchbarFocusOut(): void {
    setTimeout(() => {
      if (!this.btnFocused)
        this.open = false;
    }, 0);
  }

  searchbarBtnFocusIn(): void {
    this.btnFocused = true;
  }

  searchbarBtnFocusOut(): void {
    this.btnFocused = false;
  }

  onReset(): void {
    this.loading = false;
    this.open = false;
    this.enteredText = "";
    this.btnFocused = false;
  }
}
