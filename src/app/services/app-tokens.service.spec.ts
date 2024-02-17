import { TestBed } from '@angular/core/testing';

import { AppTokensService } from './app-tokens.service';

describe('AppTokenService', () => {
  let service: AppTokensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppTokensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
