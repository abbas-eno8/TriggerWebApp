import { TestBed, inject } from '@angular/core/testing';

import { SortByFieldService } from './sort-by-field.service';

describe('SortByFieldService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortByFieldService]
    });
  });

  it('should be created', inject([SortByFieldService], (service: SortByFieldService) => {
    expect(service).toBeTruthy();
  }));
});
