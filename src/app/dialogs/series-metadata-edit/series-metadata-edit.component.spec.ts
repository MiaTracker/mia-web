import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesMetadataEditComponent } from './series-metadata-edit.component';

describe('SeriesMetadataEditComponent', () => {
  let component: SeriesMetadataEditComponent;
  let fixture: ComponentFixture<SeriesMetadataEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesMetadataEditComponent]
    });
    fixture = TestBed.createComponent(SeriesMetadataEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
