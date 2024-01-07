import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieMetadataEditComponent } from './movie-metadata-edit.component';

describe('MovieMetadataEditComponent', () => {
  let component: MovieMetadataEditComponent;
  let fixture: ComponentFixture<MovieMetadataEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieMetadataEditComponent]
    });
    fixture = TestBed.createComponent(MovieMetadataEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
