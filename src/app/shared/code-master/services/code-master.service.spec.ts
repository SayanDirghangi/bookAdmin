import { TestBed } from '@angular/core/testing';

import { CodeMasterService } from './code-master.service';

describe('CodeMasterService', () => {
  let service: CodeMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
