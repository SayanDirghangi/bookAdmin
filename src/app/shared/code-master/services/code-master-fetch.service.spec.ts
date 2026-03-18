import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CodeMasterFetchService } from './code-master-fetch.service';

describe('CodeMasterFetchService', () => {
  let service: CodeMasterFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CodeMasterFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
