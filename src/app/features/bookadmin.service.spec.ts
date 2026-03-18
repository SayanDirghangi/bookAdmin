import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BookadminService } from './bookadmin.service';

describe('BookadminService', () => {
  let service: BookadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BookadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
