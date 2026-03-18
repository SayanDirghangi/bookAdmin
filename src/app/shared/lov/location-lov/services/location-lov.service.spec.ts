import { TestBed } from '@angular/core/testing';

import { LocationLovService } from './location-lov.service';

describe('LocationLovService', () => {
  let service: LocationLovService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationLovService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
