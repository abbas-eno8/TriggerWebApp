import { TestBed, inject } from '@angular/core/testing';

import { SmsConfirmationService } from './sms-confirmation.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnvironmentConfigService } from '../../../core/environment-config/environment-config.service';
import { ApiURL } from '../../../core/magic-string/common.model';
import { SmsConfirmationModel } from '../sms-confirmation-model';

describe('SmsConfirmationService', () => {
  let service, environmentConfigService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    environmentConfigService = jasmine.createSpyObj(['getBaseUrl']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SmsConfirmationService,
        { provide: EnvironmentConfigService, useValue: environmentConfigService },
      ]
    })
      .compileComponents();
    httpTestingController = TestBed.get(HttpTestingController);
    environmentConfigService.getBaseUrl.and.returnValue('http://localhost:4200/');
    service = TestBed.get(SmsConfirmationService);
  });

  it('should be created', inject([SmsConfirmationService], (service: SmsConfirmationService) => {
    expect(service).toBeTruthy();
  }));

  describe('sendCode', () => {
    it('should be create sendCode()', () => {
      expect(service.sendCode).toBeTruthy();
    });

    it('should call sendCode with correct URL', () => {
      // Act
      service.sendCode(MODEL).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.SmsVerification);
      req.flush({ "message": "Team Configuration completed successfully.", "status": 200, "data": {} });
      httpTestingController.verify();
    });
  });

  describe('verifyCode', () => {
    it('should be create verifyCode()', () => {
      expect(service.verifyCode).toBeTruthy();
    });

    it('should call verifyCode with correct URL', () => {
      // Act
      service.verifyCode(MODEL).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.SmsVerification);
      req.flush({ "message": "Team Configuration updated successfully.", "status": 200, "data": {} });
      httpTestingController.verify();
    });
  });
});

let MODEL: SmsConfirmationModel = {
  'empId': 0,
  'email': '',
  'phoneNumber': '',
  'verificationCode': 0,
  'createdBy': 0,
  'updatedBy': 0
}
