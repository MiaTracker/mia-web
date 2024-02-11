import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstancePageComponent } from './instance-page.component';

describe('InstancePageComponent', () => {
  let component: InstancePageComponent;
  let fixture: ComponentFixture<InstancePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstancePageComponent]
    });
    fixture = TestBed.createComponent(InstancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
