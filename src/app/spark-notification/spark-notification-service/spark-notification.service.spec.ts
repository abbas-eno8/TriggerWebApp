import { TestBed, inject } from '@angular/core/testing';
import { SparkNotificationService } from './spark-notification.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnvironmentConfigService } from '../../core/environment-config/environment-config.service';
import { SparkNotificationAdapter } from '../spark-notification-adapter/spark-notification.adapter';
import { ApiURL } from '../../core/magic-string/common.model';
import { UnApprovedSpark } from '../spark-notification-model';

describe('SparkNotificationService', () => {
  let service, environmentConfigService, adapter;
  let httpTestingController: HttpTestingController;
  let clientId: number, teamId: number, userId: number;
  beforeEach(() => {
    environmentConfigService = jasmine.createSpyObj(['getBaseUrl']);
    adapter = jasmine.createSpyObj(['toResponseSparkNotificationList']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SparkNotificationService,
        { provide: EnvironmentConfigService, useValue: environmentConfigService },
        { provide: SparkNotificationAdapter, useValue: adapter }
      ]
    }).compileComponents();
    httpTestingController = TestBed.get(HttpTestingController);
    environmentConfigService.getBaseUrl.and.returnValue('http://localhost:4200/');
    service = TestBed.get(SparkNotificationService);
  });

  it('should be created', inject([SparkNotificationService], (service: SparkNotificationService) => {
    expect(service).toBeTruthy();
  }));

  describe('getSparks', () => {

    it('should be create getSparks()', () => {
      expect(service.getSparks).toBeTruthy();
    });
    it('should call getSparks with correct URL', () => {
      // Act
      service.getSparks().subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.UnApprovedSpark);
      adapter.toResponseSparkNotificationList.and.returnValue(SPARKNOTIFICATIONS);
      req.flush(SPARKNOTIFICATIONS);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getSparks().subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.UnApprovedSpark);
      expect(req.request.method).toBe("GET");
    });
  });

  describe('submitSpark', () => {
    it('should be create submitSpark()', () => {
      expect(service.submitSpark).toBeTruthy();
    });

    it('should call submitSpark with correct URL', () => {
      // Act
      service.submitSpark(SPARKNOTIFICATIONS[0]).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.SmsSparkApproval);
      req.flush({ "message": "Spark approved successfully.", "status": 200, "data": {} });
      httpTestingController.verify();
    });
  });
});

let SPARKNOTIFICATIONS: UnApprovedSpark[] = [
  {
    'empId': 1,
    'sparkId': 2,
    'sparkDate': "2019-12-20T00:00:00",
    'sparkBy': 2,
    'sparkByFirstName': "Rajesh",
    'sparkByLastName': "Chapaneria",
    'firstName': "Hari",
    'lastName': "Nair",
    'givenBy': 'Hari Nair',
    'employeeName': "Vivek Bhavsar",
    'spark': "By Admin",
    'approvalStatus': 1,
    'createdBy': 1,
  },
  {
    'empId': 2,
    'sparkId': 3,
    'sparkDate': "2019-12-20T00:00:00",
    'sparkBy': 3,
    'sparkByFirstName': "jen",
    'sparkByLastName': "albert",
    'firstName': "Krishna",
    'lastName': "Nair",
    'givenBy': 'Hari Nair',
    'employeeName': "Nirma Bhavsar",
    'spark': "By Admin",
    'approvalStatus': 1,
    'createdBy': 1,
  }]
