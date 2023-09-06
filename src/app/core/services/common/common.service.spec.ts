import { TestBed, inject } from '@angular/core/testing';

import { CommonService } from './common.service';
import { EnvironmentConfigService } from '../../environment-config/environment-config.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiURL, SendMail } from '../../magic-string/common.model';

describe('CommonService', () => {
  let environmentConfigService;
  let service: CommonService;
  let httpTestingController: HttpTestingController;
  let userId: number, widgetType: number, clientId: number, employeeId: number;
  beforeEach(() => {
    environmentConfigService = jasmine.createSpyObj(['getBaseUrl']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CommonService,
        { provide: EnvironmentConfigService, useValue: environmentConfigService },]
    })
      .compileComponents();
    httpTestingController = TestBed.get(HttpTestingController);
    environmentConfigService.getBaseUrl.and.returnValue('http://localhost:4200');
    service = TestBed.get(CommonService);
    userId = 1;
    widgetType = 2;
    clientId = 1;
    employeeId = 1;
  });

  it('should be created', inject([CommonService], (service: CommonService) => {
    expect(service).toBeTruthy();
  }));

  describe('getWidgetData', () => {

    it('should be create getWidgetData()', () => {
      expect(service.getWidgetData).toBeTruthy();
    });
    it('should call getWidgetData with correct URL', () => {
      // Act
      service.getWidgetData(userId, widgetType).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Widget + widgetType + '/' + userId);
      req.flush(Widgets);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getWidgetData(userId, widgetType).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Widget + widgetType + '/' + userId);
      expect(req.request.method).toBe("GET");
    });
  });

  describe('setWidgetData', () => {
    it('should be create setWidgetData()', () => {
      expect(service.setWidgetData).toBeTruthy();
    });

    it('should call setWidgetData with correct URL', () => {
      // Act
      service.setWidgetData(Widgets).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Widget);
      req.flush({ "message": "Team Configuration completed successfully.", "status": 200, "data": {} });
      httpTestingController.verify();
    });
  });

  describe('sendMail', () => {
    it('should be create sendMail()', () => {
      expect(service.sendMail).toBeTruthy();
    });

    it('should call sendMail with correct URL', () => {
      // Act
      service.sendMail(SendMailObj).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.SendActionWiseEmail);
      req.flush({ "message": "Sent Mail successfully.", "status": 200, "data": {} });
      httpTestingController.verify();
    });
  });

  describe('deleteEmployeeById', () => {

    it('should be create deleteEmployeeById()', () => {
      expect(service.deleteEmployeeById).toBeTruthy();
    });

    it('should call deleteEmployeeById with correct URL', () => {
      // Act
      service.deleteEmployeeById(clientId, employeeId, userId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Employee + clientId + '/' + employeeId + '/' + userId);
      expect(req.request.method).toBe("DELETE");
      req.flush({ "message": "Team Member Deleted.", "status": 200, "data": {} });
      httpTestingController.verify();
    });

    it('should be DELETE method', () => {
      service.deleteEmployeeById(clientId, employeeId, userId).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Employee + clientId + '/' + employeeId + '/' + userId);
      expect(req.request.method).toBe("DELETE");
    });
  });
});

let SendMailObj: SendMail = {
  'id': 0,
  'actionId': 0,
  'employeeEmail': '',
  'emailContent': '',
  'sendSpark': 1,
  'sendTrigger': 1
}
let Widgets = [
  {
    "userId": 145,
    "widgetId": 8,
    "widgetName": "total-direct-report-today",
    "widgetActualName": "Total Number of Direct Reports Today",
    "sequenceNumber": 1,
    "tileSequence": 1,
    "position": 0.0000,
    "isActive": true,
    "isSelected": 0,
    "roleId": 0,
    "createdBy": 0,
    "result": 0,
    "widgetType": 0
  }, {
    "userId": 145,
    "widgetId": 9,
    "widgetName": "average-direct-report-today",
    "widgetActualName": "Average Score of my Direct Reports Today",
    "sequenceNumber": 2,
    "tileSequence": 2,
    "position": 0.2500,
    "isActive": true,
    "isSelected": 0,
    "roleId": 0,
    "createdBy": 0,
    "result": 0,
    "widgetType": 0
  }]

let SetWidget = [
  {
    "userId": 145,
    "id": 8,
    "widgetId": "8",
    "tileSelector": "total-direct-report-today",
    "isActive": true,
    "sequenceNumber": 1,
    "tileSequence": 1,
    "position": 0,
    "widgetActualName": "Total Number of Direct Reports"
  }, {
    "userId": 145,
    "id": 9,
    "widgetId": "9",
    "tileSelector": "average-direct-report-today",
    "isActive": false,
    "sequenceNumber": 2,
    "tileSequence": 2,
    "position": 0.25,
    "widgetActualName": "Average Score of my Direct Reports"
  }, {
    "userId": 145,
    "id": 10,
    "widgetId": "10",
    "tileSelector":
      "total-org-today",
    "isActive": false,
    "sequenceNumber": 3,
    "tileSequence": 3,
    "position": 0.25,
    "widgetActualName": "Total Number of my Organization"
  }, {
    "userId": 145,
    "id": 11,
    "widgetId": "11",
    "tileSelector": "average-org-today",
    "isActive": true,
    "sequenceNumber": 4,
    "tileSequence": 4,
    "position": 0.25,
    "widgetActualName": "Average Score of my Organization"
  }, {
    "userId": 145,
    "id": 12,
    "widgetId": "12",
    "tileSelector": "direct-reports-to-date",
    "isActive": true,
    "sequenceNumber": 5,
    "tileSequence": 5,
    "position": 0.5,
    "widgetActualName": "My Direct Reports-Column Graph"
  }, {
    "userId": 145,
    "id": 13,
    "widgetId": "13",
    "tileSelector": "direct-reports-by-average-score",
    "isActive": true,
    "sequenceNumber": 6,
    "tileSequence": 6,
    "position": 0,
    "widgetActualName": "My Direct Reports By Average Score Line Graph\r\n"
  },
  {
    "userId": 145,
    "id": 14,
    "widgetId": "14",
    "tileSelector": "org-to-date",
    "isActive": true,
    "sequenceNumber": 7,
    "tileSequence": 7,
    "position": 0.5,
    "widgetActualName": "My Organization-Column Graph"
  },
  {
    "userId": 145,
    "id": 15,
    "widgetId": "15",
    "tileSelector": "org-by-average-score",
    "isActive": true,
    "sequenceNumber": 8,
    "tileSequence": 8,
    "position": 0,
    "widgetActualName": "My Organization By Average Score Line Graph\r\n"
  },
  {
    "userId": 145,
    "id": 16,
    "widgetId": "16",
    "tileSelector": "direct-reports-to-date-progressive",
    "isActive": true,
    "sequenceNumber": 9,
    "tileSequence": 9,
    "position": 0.5,
    "widgetActualName": "My Direct Reports-Progressive Graph"
  }]
