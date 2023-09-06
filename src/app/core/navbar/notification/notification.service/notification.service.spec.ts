import { TestBed, inject, async } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { EnvironmentConfigService } from '../../../environment-config/environment-config.service';
import { ApiURL, NotificationModel } from '../../../magic-string/common.model';
import { Response } from '../../../common.response';
describe('NotificationService', () => {
  let environmentConfigService;
  let NOTIFICATIONS, empId, ids;
  let service: NotificationService;
  let httpTestingController: HttpTestingController;
  beforeEach(async(() => {
    NOTIFICATIONS = {
      "message": "Ok",
      "status": 200,
      "data": [
        {
          "id": 1,
          "empId": 1,
          "message": "Netri Added Under You.",
          "managerId": 25676,
          "action": "Added",
          "isSent": false,
          "markAs": false,
          "createdBy": 25676,
          "createdDtStamp": "2019-01-09T07:24:25.33",
          "type": "Employee",
          "result": 0,
          "ids": null
        },
        {
          "id": 2,
          "empId": 2,
          "message": "Netri Added Under You.",
          "managerId": 25676,
          "action": "Added",
          "isSent": false,
          "markAs": false,
          "createdBy": 25676,
          "createdDtStamp": "2019-01-09T07:24:25.33",
          "type": "Employee",
          "result": 0,
          "ids": null
        }
      ]
    }

    environmentConfigService = jasmine.createSpyObj(['getBaseUrl']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationService,
        { provide: EnvironmentConfigService, useValue: environmentConfigService },]
    })
      .compileComponents();
    httpTestingController = TestBed.get(HttpTestingController);
    environmentConfigService.getBaseUrl.and.returnValue('http://localhost:4200');
    service = TestBed.get(NotificationService);
    empId = 1;
    ids = [1, 2, 3]
  }));

  it('should be created', inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
  }));

  describe('getAllNotification', () => {

    it('should be create getAllNotification()', () => {
      expect(service.getNotifications).toBeTruthy();
    });

    it('should call getAllNotification with correct URL', () => {
      // Act
      service.getNotifications(1).subscribe();

      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Notification + empId);
      req.flush(NOTIFICATIONS);
      httpTestingController.verify();
    });

    it('should be GET method', () => {
      service.getNotifications(1).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Notification + empId);
      expect(req.request.method).toBe("GET");
    });

    it(`should respond with fake Notification data`, async(inject([HttpClient, HttpTestingController],
      (http: HttpClient, backend: HttpTestingController) => {
        http.get(service.baseUrl + ApiURL.Notification + empId).subscribe((next: Response) => {
          expect(next.data).toEqual(NOTIFICATIONS.data);
        });

        backend.match({
          url: service.baseUrl + ApiURL.Notification + empId,
          method: 'GET'
        })[0].flush(NOTIFICATIONS);
      })));

  });

  describe('readNotification', () => {

    it('should be create readNotification()', () => {
      expect(service.readNotification).toBeTruthy();
    });

    it('should call readNotification with correct URL', () => {
      // Act
      service.readNotification(ids).subscribe();

      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Notification + ids, null);
      req.flush({ "message": "Ok", "status": 200, "data": [{}] });
      httpTestingController.verify();
    });

    it('should be GET method', () => {
      service.readNotification(ids).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Notification + ids, null);
      expect(req.request.method).toBe("PUT");
    });

    it(`should respond with fake Notification data`, async(inject([HttpClient, HttpTestingController],
      (http: HttpClient, backend: HttpTestingController) => {
        http.put(service.baseUrl + ApiURL.Notification + ids, null).subscribe((next: Response) => {
          expect(next.data.length).toEqual(1);
          expect(next.status).toEqual(200);
        });

        backend.match({
          url: service.baseUrl + ApiURL.Notification + ids,
          method: 'PUT'
        })[0].flush({ "message": "Ok", "status": 200, "data": [{}] });
      })));

  });

  describe('getActionRequest', () => {
    it('should be create getActionRequest()', () => {
      expect(service.getActionRequest).toBeTruthy();
    });

    it('should call getActionRequest with correct URL', () => {
      // Act
      service.getActionRequest(NOTIFICATION).subscribe();

      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.ActionRequest + NOTIFICATION.requestId + '/' + NOTIFICATION.managerId + '/' + NOTIFICATION.empId + '/' + NOTIFICATION.actionId);
      httpTestingController.verify();
    });

    it('should be GET method', () => {
      service.getActionRequest(NOTIFICATION).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.ActionRequest + NOTIFICATION.requestId + '/' + NOTIFICATION.managerId + '/' + NOTIFICATION.empId + '/' + NOTIFICATION.actionId);
      expect(req.request.method).toBe("GET");
    });

    it(`should respond with fake getActionRequest data`, async(inject([HttpClient, HttpTestingController],
      (http: HttpClient, backend: HttpTestingController) => {
        http.get(service.baseUrl + ApiURL.ActionRequest + NOTIFICATION.requestId + '/' + NOTIFICATION.managerId + '/' + NOTIFICATION.empId + '/' + NOTIFICATION.actionId).subscribe((next: Response) => {
          expect(next.data.length).toEqual(1);
          expect(next.status).toEqual(200);
        });

        backend.match({
          url: service.baseUrl + ApiURL.ActionRequest + NOTIFICATION.requestId + '/' + NOTIFICATION.managerId + '/' + NOTIFICATION.empId + '/' + NOTIFICATION.actionId,
          method: 'GET'
        })[0].flush({ "message": "Ok", "status": 200, "data": [{}] });
      })));
  });
});

let NOTIFICATIONS: NotificationModel[] = [
  {
    "id": 170,
    "empId": 19,
    "managerId": 1,
    "actionId": 2,
    "requestId": 149,
    "message": "Notification Test Requested You For Spark.",
    "type": 3,
    "markAs": true,
  },
  {
    "id": 169,
    "empId": 19,
    "managerId": 1,
    "actionId": 1,
    "requestId": 148,
    "message": "Notification Test Requested You For Trigger.",
    "type": 2,
    "markAs": true,
  },
]

let NOTIFICATION: NotificationModel =
  {
    "id": 169,
    "empId": 19,
    "managerId": 1,
    "actionId": 1,
    "requestId": 148,
    "message": "Notification Test Requested You For Trigger.",
    "type": 2,
    "markAs": true,
  };