import { TestBed, inject } from '@angular/core/testing';
import { LoaderService } from './loader.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

describe('LoaderService', () => {
  let ng4LoadingSpinnerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService, 
        { provide: Ng4LoadingSpinnerService, useValue: ng4LoadingSpinnerService },
        // Ng4LoadingSpinnerService
      ]
    });
  });

  // it('should be created', inject([LoaderService], (service: LoaderService) => {
  //   expect(service).toBeTruthy();
  // }));

  // describe('emitIsLoaderShown', () => {
  //   it('should be create emitIsLoaderShown()', inject([LoaderService], (service: LoaderService) => {
  //     expect(service.emitIsLoaderShown).toBeTruthy();
  //   }));

  //   it('should be check emitIsLoaderShown() must have status parameter with true value', inject([LoaderService], (service: LoaderService) => {
  //     service.emitIsLoaderShown(true);
  //   }));

  //   it('should be check emitIsLoaderShown() must have status parameter with false value', inject([LoaderService], (service: LoaderService) => {
  //     service.emitIsLoaderShown(false);
  //   }));
  // });
  
});
