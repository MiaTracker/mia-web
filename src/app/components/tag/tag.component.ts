import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.sass']
})
export class TagComponent {
  @Input()
  public content: string | undefined;
  @Input()
  public editable: boolean = false;

  @Output()
  public delete = new EventEmitter();

  protected onDeleteClicked(): void {
    this.delete.emit();
  }
}
