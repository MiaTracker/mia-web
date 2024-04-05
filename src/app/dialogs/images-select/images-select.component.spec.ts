import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesSelectComponent } from './images-select.component';

describe('ImagesSelectComponent', () => {
  let component: ImagesSelectComponent;
  let fixture: ComponentFixture<ImagesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImagesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
