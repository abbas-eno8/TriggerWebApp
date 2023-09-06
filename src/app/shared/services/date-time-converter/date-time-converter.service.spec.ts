import { TestBed, inject } from '@angular/core/testing';

import { DateTimeConverterService } from './date-time-converter.service';

describe('DateTimeConverterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateTimeConverterService]
    });
  });

  it('should be created', inject([DateTimeConverterService], (service: DateTimeConverterService) => {
    expect(service).toBeTruthy();
  }));
});
