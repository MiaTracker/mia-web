import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenGenerateComponent } from './token-generate.component';

describe('TokenCreateComponent', () => {
  let component: TokenGenerateComponent;
  let fixture: ComponentFixture<TokenGenerateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TokenGenerateComponent]
    });
    fixture = TestBed.createComponent(TokenGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
