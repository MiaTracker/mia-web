import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.sass']
})
export class SearchbarComponent {
  private subscription: Subscription | undefined;

  @Input()
  set reset(val: EventEmitter<void>) {
    this.subscription?.unsubscribe();
    this.subscription = val.subscribe(() => this.onReset());
  }

  @Output()
  public search = new EventEmitter<string | null>();

  @Output()
  public committed = new EventEmitter<void>();

  protected control = new FormControl<string>("", { updateOn: "change" });

  protected onInput() {
    this.search.emit(this.control.value);
  }

  protected onReturn() {
    this.committed.emit();
  }

  protected execReset(): void {
    this.control.reset();
    this.onInput();
  }

  private onReset(): void {
    this.control.reset();
  }
}
