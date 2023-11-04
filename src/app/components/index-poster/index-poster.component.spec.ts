import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPosterComponent } from './index-poster.component';

describe('IndexPosterComponent', () => {
  let component: IndexPosterComponent;
  let fixture: ComponentFixture<IndexPosterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexPosterComponent]
    });
    fixture = TestBed.createComponent(IndexPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
