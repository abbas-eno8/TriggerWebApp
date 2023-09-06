import { TestBed, inject } from '@angular/core/testing';
import { SharedFunctionService } from './shared-function.service';

describe('SharedFunctionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedFunctionService]
    });
  });

  // it('should be created', inject([SharedFunctionService], (service: SharedFunctionService) => {
  //   expect(service).toBeTruthy();
  // }));
});
