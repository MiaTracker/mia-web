import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPosterComponent } from './details-poster.component';

describe('DetailsPosterComponent', () => {
  let component: DetailsPosterComponent;
  let fixture: ComponentFixture<DetailsPosterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsPosterComponent]
    });
    fixture = TestBed.createComponent(DetailsPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
