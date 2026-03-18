import { TestBed } from '@angular/core/testing';

import { CookieShareService } from './cookie-share.service';

describe('CookieShareService', () => {
  let service: CookieShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
