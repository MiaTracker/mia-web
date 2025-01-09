import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.sass'],
    standalone: false
})
export class TagComponent {
  @Input()
  public content: string | undefined;
  @Input()
  public editable: boolean = false;
  @Input()
  public primaryAction: boolean = false;

  @Output()
  public delete = new EventEmitter();

  @Output()
  public setPrimary = new EventEmitter();

  protected onDeleteClicked(): void {
    this.delete.emit();
  }

  protected onPrimaryClicked(): void {
    this.setPrimary.emit();
  }
}
