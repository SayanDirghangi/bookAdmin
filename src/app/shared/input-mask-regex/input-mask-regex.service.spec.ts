import { TestBed } from '@angular/core/testing';

import { InputMaskRegexService } from './input-mask-regex.service';

describe('InputMaskRegexService', () => {
  let service: InputMaskRegexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputMaskRegexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
