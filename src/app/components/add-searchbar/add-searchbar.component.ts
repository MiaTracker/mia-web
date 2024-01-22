import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-searchbar',
  templateUrl: './add-searchbar.component.html',
  styleUrls: ['./add-searchbar.component.sass']
})
export class AddSearchbarComponent {
  subscription: Subscription | undefined;

  @Input()
  set reset(val: EventEmitter<void>) {
    this.subscription?.unsubscribe();
    this.subscription = val.subscribe(() => this.onReset());
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
      this.loading = true;
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
