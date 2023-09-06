import { TestBed, inject } from '@angular/core/testing';

import { UserProfileService } from './user-profile.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvironmentConfigService } from '../../core/environment-config/environment-config.service';
import { ApiURL } from '../../core/magic-string/common.model';
import { SmsNotificationModel, UserProfileModel } from '../user-profile-model';

describe('UserProfileService', () => {
  let service, environmentConfigService;
  let httpTestingController: HttpTestingController;
  let userId: number, empId: number;
  beforeEach(() => {
    environmentConfigService = jasmine.createSpyObj(['getBaseUrl']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserProfileService,
        { provide: EnvironmentConfigService, useValue: environmentConfigService },
      ]
    })
      .compileComponents();
    httpTestingController = TestBed.get(HttpTestingController);
    environmentConfigService.getBaseUrl.and.returnValue('http://localhost:4200/');
    service = TestBed.get(UserProfileService);
    userId = 2;
    empId = 4;
  });

  it('should be created', inject([UserProfileService], (service: UserProfileService) => {
    expect(service).toBeTruthy();

    describe('updateProfile', () => {
      it('should be create updateProfile()', () => {
        expect(service.updateProfile).toBeTruthy();
      });
  
      it('should call updateProfile with correct URL', () => {
        // Act
        service.updateProfile(userId, UPDATEPROFILE).subscribe();
        // Assert
        const req = httpTestingController.expectOne(service.baseUrl + ApiURL.ChangeProfile + userId);
        req.flush({ "message": "Team Configuration updated successfully.", "status": 200, "data": {} });
        httpTestingController.verify();
      });
    });

    describe('getProfile', () => {

      it('should be create getProfile()', () => {
        expect(service.getProfile).toBeTruthy();
      });
      it('should call getProfile with correct URL', () => {
        // Act
        service.getProfile(empId).subscribe();
        // Assert
        const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Employee + ApiURL.EditProfile + empId);
        req.flush(USERPROFILE);
        httpTestingController.verify();
        expect(req.request.method).toBe('GET');
      });
  
      it('should be GET method', () => {
        service.getProfile(empId).subscribe();
        const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Employee + ApiURL.EditProfile + empId);
        expect(req.request.method).toBe("GET");
      });
    });
  
    describe('updateUserProfile', () => {
      it('should be create updateUserProfile()', () => {
        expect(service.updateUserProfile).toBeTruthy();
      });
  
      it('should call updateUserProfile with correct URL', () => {
        // Act
        service.updateUserProfile(userId, USERPROFILE).subscribe();
        // Assert
        const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Employee + ApiURL.EditProfile + userId);
        req.flush({ "message": "Team Configuration updated successfully.", "status": 200, "data": {} });
        httpTestingController.verify();
      });
    });
  
    describe('allowSmsNotification', () => {
      it('should be create allowSmsNotification()', () => {
        expect(service.allowSmsNotification).toBeTruthy();
      });
  
      it('should call allowSmsNotification with correct URL', () => {
        // Act
        service.allowSmsNotification(userId, SMSNOTIFICATION).subscribe();
        // Assert
        const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Employee + ApiURL.AllowSms + userId);
        req.flush({ "message": "Team Configuration updated successfully.", "status": 200, "data": {} });
        httpTestingController.verify();
      });
    });

  }));
});

let UPDATEPROFILE: any = {
  empid: 1,
  companyId: 1,
  empImgPath: 'this.iconName',
  empImage: ''
}
let USERPROFILE: UserProfileModel = {
  'empId': 0,
  'employeeId': 0,
  'phoneNumber': '',
  'updatedBy': 0,
  'workCity': '',
  'workState': '',
  'workZipcode': 0
};

let SMSNOTIFICATION: SmsNotificationModel = {
  'empId': 0,
  'optForSms': false,
  'updatedBy': 0
};
