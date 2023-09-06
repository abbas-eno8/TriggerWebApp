import { TestBed, inject } from '@angular/core/testing';

import { GeneratePdfService } from './generate-pdf.service';

describe('GeneratePdfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeneratePdfService]
    });
  });

  // it('should be created', inject([GeneratePdfService], (service: GeneratePdfService) => {
  //   expect(service).toBeTruthy();
  // }));
});
