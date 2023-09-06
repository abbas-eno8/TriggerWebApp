import { TestBed, inject } from '@angular/core/testing';

import { BlobToByteArrayService } from './blob-to-byte-array.service';

describe('BlobToByteArrayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlobToByteArrayService]
    });
  });

  // it('should be created', inject([BlobToByteArrayService], (service: BlobToByteArrayService) => {
  //   expect(service).toBeTruthy();
  // }));
});
