import { TestBed } from '@angular/core/testing';

import { AppServiceInterceptor } from './app-service.interceptor';

describe('AppServiceInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AppServiceInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AppServiceInterceptor = TestBed.inject(AppServiceInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
