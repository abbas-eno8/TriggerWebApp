import { TestBed, inject } from '@angular/core/testing';
import { UrlEncryptionDecryptionService } from './url-encryption-decryption.service';

describe('UrlEncryptionDecryptionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlEncryptionDecryptionService]
    });
  });

  // it('should be created', inject([UrlEncryptionDecryptionService], (service: UrlEncryptionDecryptionService) => {
  //   expect(service).toBeTruthy();
  // }));
});
