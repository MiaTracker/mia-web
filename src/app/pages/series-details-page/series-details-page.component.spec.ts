import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesDetailsPageComponent } from './series-details-page.component';

describe('SeriesDetailsPageComponent', () => {
  let component: SeriesDetailsPageComponent;
  let fixture: ComponentFixture<SeriesDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesDetailsPageComponent]
    });
    fixture = TestBed.createComponent(SeriesDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
