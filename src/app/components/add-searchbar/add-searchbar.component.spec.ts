import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSearchbarComponent } from './add-searchbar.component';

describe('AddSearchbarComponent', () => {
  let component: AddSearchbarComponent;
  let fixture: ComponentFixture<AddSearchbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSearchbarComponent]
    });
    fixture = TestBed.createComponent(AddSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
