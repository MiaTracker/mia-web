import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenShowComponent } from './token-show.component';

describe('TokenShowComponent', () => {
  let component: TokenShowComponent;
  let fixture: ComponentFixture<TokenShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TokenShowComponent]
    });
    fixture = TestBed.createComponent(TokenShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
