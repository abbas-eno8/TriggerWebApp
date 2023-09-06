import { TestBed, inject } from '@angular/core/testing';

import { CommonRedirectionServiceService } from './common-redirection-service.service';

describe('CommonRedirectionServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonRedirectionServiceService]
    });
  });

  // it('should be created', inject([CommonRedirectionServiceService], (service: CommonRedirectionServiceService) => {
  //   expect(service).toBeTruthy();
  // }));
});
