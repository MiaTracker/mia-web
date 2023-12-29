import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.sass']
})
export class TagListComponent {
  private _editable: boolean = false;

  @Input()
  public property: string = "";

  @Input()
  public tags: any[] | undefined;

  @Input()
  public get editable(): boolean {
    return this._editable;
  }

  @Output()
  public addTag = new EventEmitter();

  @Output()
  public deleteTag = new EventEmitter();

  public set editable(val: boolean) {
    this.adding = false;
    this._editable = val;
  }

  @ViewChild("addBtnInput") addBtnInput!: ElementRef;


  protected adding: boolean = false;

  protected onAddBtnPlusClicked(): void {
    this.adding = !this.adding;
    if(this.adding) setTimeout(() => this.addBtnInput.nativeElement.focus());
    else {
      this.addTag.emit({name: this.addBtnInput.nativeElement.innerText});
      this.addBtnInput.nativeElement.innerHTML = ''
    }
  }

  protected onAddBtnInputFocusLost(): void {
    this.adding = false;
  }

  protected onDeleteTag(tag: any): void {
    this.deleteTag.emit({ tag: tag });
  }
}
