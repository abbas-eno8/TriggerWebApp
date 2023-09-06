import { TestBed, inject } from '@angular/core/testing';

import { ContactUsService } from './contact-us.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvironmentConfigService } from '../../core/environment-config/environment-config.service';
import { ApiURL } from '../../core/magic-string/common.model';
import { ContactUsModel } from '../contact-us-model';

describe('ContactUsService', () => {
  let service, environmentConfigService;
  let httpTestingController: HttpTestingController;
  let clientId: number, teamId: number, userId: number;
  beforeEach(() => {
    environmentConfigService = jasmine.createSpyObj(['getBaseUrl']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ContactUsService,
        { provide: EnvironmentConfigService, useValue: environmentConfigService },
      ]
    }).compileComponents();
    httpTestingController = TestBed.get(HttpTestingController);
    environmentConfigService.getBaseUrl.and.returnValue('http://localhost:4200/');
    service = TestBed.get(ContactUsService);
  });

  it('should be created', inject([ContactUsService], (service: ContactUsService) => {
    expect(service).toBeTruthy();
  }));

  describe('contactUs', () => {
    it('should be create contactUs()', () => {
      expect(service.contactUs).toBeTruthy();
    });

    it('should call addTeam with correct URL', () => {
      // Act
      service.contactUs(CONTACTUS).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.ContactUs);
      req.flush({ "message": "Team Configuration completed successfully.", "status": 200, "data": {} });
      httpTestingController.verify();
    });
  });
});

let CONTACTUS: ContactUsModel = {
  fullName: 'Anjali',
  email: 'anjalitandel@gmail.com',
  subject: '',
  comments: ''
}
