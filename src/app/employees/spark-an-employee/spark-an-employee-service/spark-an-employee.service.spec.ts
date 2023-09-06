import { TestBed, inject, async } from '@angular/core/testing';
import { SparkAnEmployeeService } from './spark-an-employee.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SparkAnEmployeeAdapter } from '../spark-an-employee-adapter/spark-an-employee-adapter';
import { EnvironmentConfigService } from '../../../core/environment-config/environment-config.service';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { ApiURL, Version2 } from '../../../core/magic-string/common.model';
import { Encryption } from '../../../core/magic-string/common-validation-model';
import { Category, Classification, RequestModel, SparkAnEmployee } from '../spark-an-employee-model';

describe('SparkAnEmployeeService', () => {
  let globalResponseHandlerService, environmentConfigService, adapter;
  let httpTestingController: HttpTestingController;
  let service: SparkAnEmployeeService;
  let clientId = 1;
  let empId = 2, sparkId = 2, userId = 2;
  beforeEach(() => {
    environmentConfigService = jasmine.createSpyObj(['getBaseUrl']);
    adapter = jasmine.createSpyObj(['toResponseCategory', 'toResponseClassification', 'toResponse', 'getSparkResponse']);
    globalResponseHandlerService = jasmine.createSpyObj(['encriptData']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SparkAnEmployeeService,
        { provide: GlobalResponseHandlerService, useValue: globalResponseHandlerService },
        { provide: EnvironmentConfigService, useValue: environmentConfigService },
        { provide: SparkAnEmployeeAdapter, useValue: adapter }
      ]
    })
      .compileComponents();
    httpTestingController = TestBed.get(HttpTestingController);
    environmentConfigService.getBaseUrl.and.returnValue('http://localhost:4200');
    service = TestBed.get(SparkAnEmployeeService);
  });

  it('should be created', inject([SparkAnEmployeeService], (service: SparkAnEmployeeService) => {
    expect(service).toBeTruthy();
  }));

  describe('getCategory', () => {

    it('should be create getCategory()', () => {
      expect(service.getCategory).toBeTruthy();
    });
    it('should call getCategory with correct URL', () => {
      // Act
      service.getCategory(clientId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Category + clientId);
      adapter.toResponseCategory.and.returnValue(CATEGORIES);
      req.flush(CATEGORIES);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getCategory(clientId).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Category + clientId);
      expect(req.request.method).toBe("GET");
    });

    // it(`should respond with fake Clients data`, async(inject([HttpClient, HttpTestingController],
    //   (http: HttpClient, backend: HttpTestingController) => {
    //     http.get(service.baseUrl + ApiURL.Client).subscribe((next: ApiResponse) => {
    //       expect(next.data).toEqual(CATEGORIES);
    //     });

    //     backend.match({
    //       url: service.baseUrl + ApiURL.Category + clientId,
    //       method: 'GET'
    //     })[0].flush(CATEGORIES);
    //   })));
  });

  describe('getSparkClassification', () => {

    it('should be create getSparkClassification()', () => {
      expect(service.getSparkClassification).toBeTruthy();
    });
    it('should call getSparkClassification with correct URL', () => {
      // Act
      service.getSparkClassification(clientId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Classification + clientId);
      adapter.toResponseClassification.and.returnValue(CLASSIFICATIONS);
      req.flush(CLASSIFICATIONS);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getSparkClassification(clientId).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Classification + clientId);
      expect(req.request.method).toBe("GET");
    });
  });

  describe('getSparks', () => {

    it('should be create getSparks()', () => {
      expect(service.getSparks).toBeTruthy();
    });
    it('should call getSparks with correct URL', () => {
      // Act
      service.getSparks(empId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.SparkAnEmployee + empId);
      adapter.toResponse.and.returnValue(EmployeeSparks);
      req.flush(EmployeeSparks);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getSparks(empId).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.SparkAnEmployee + empId);
      expect(req.request.method).toBe("GET");
    });
  });

  describe('addSpark', () => {
    it('should be create addSpark()', () => {
      expect(service.addSpark).toBeTruthy();
    });

    it('should call addSpark with correct URL', () => {
      // Act
      service.addSpark(ADDSPARK).subscribe();
      adapter.getSparkResponse.and.returnValue(ADDSPARK);
      expect(globalResponseHandlerService.encriptData).toHaveBeenCalledWith(Version2.Version3, Encryption.Version, Encryption.VersionKey);
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.SparkAnEmployee);
      req.flush({ "message": "Employee sparked successfully.", "status": 200, "data": { "companyId": 73, "empId": 10, "employeeId": null, "firstName": "Roshan", "lastName": "Patel", "sparkId": 10, "categoryId": 1, "category": "Performance", "sparkDate": "2019-12-20T13:12:22", "sparkBy": 1, "sparkByFirstName": "Hari", "sparkByLastName": "Nair", "remarks": "ssssss", "viaSms": false, "bActive": true, "approvalStatus": 0, "approvalBy": 0, "approvalDate": "0001-01-01T00:00:00", "rejectionRemark": null, "createdBy": 1, "updatedBy": 0, "result": 1, "phoneNumber": null, "senderPhoneNumber": null, "sparkByImgPath": "", "sendSpark": false, "employeeEmail": "roshanP@yopmail.com", "isSparkSent": 0, "classificationId": 2, "classification": "Praise", "documentName": "", "documentContents": "", "cloudFilePath": "" } });
      httpTestingController.verify();
    });
  });

  describe('updateSpark', () => {
    it('should be create updateSpark()', () => {
      expect(service.updateSpark).toBeTruthy();
    });

    it('should call updateSpark with correct URL', () => {
      // Act
      service.updateSpark(UPDATESPARK).subscribe();
      expect(globalResponseHandlerService.encriptData).toHaveBeenCalledWith(Version2.Version3, Encryption.Version, Encryption.VersionKey);
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.SparkAnEmployee);
      req.flush({ "message": "Spark updated successfully.", "status": 200, "data": { "companyId": 73, "empId": 10, "employeeId": null, "firstName": "Roshan", "lastName": "Patel", "sparkId": 10, "categoryId": 1, "category": "Performance", "sparkDate": "2019-12-20T13:18:08", "sparkBy": 1, "sparkByFirstName": "Hari", "sparkByLastName": "Nair", "remarks": "ssssss", "viaSms": false, "bActive": true, "approvalStatus": 0, "approvalBy": 0, "approvalDate": "0001-01-01T00:00:00", "rejectionRemark": null, "createdBy": 1, "updatedBy": 1, "result": 1, "phoneNumber": null, "senderPhoneNumber": null, "sparkByImgPath": "", "sendSpark": false, "employeeEmail": "roshanP@yopmail.com", "isSparkSent": 0, "classificationId": 2, "classification": "Praise", "documentName": "", "documentContents": "", "cloudFilePath": "" } });
      httpTestingController.verify();
    });
  });

  describe('deleteSpark', () => {

    it('should be create deleteSpark()', () => {
      expect(service.deleteSpark).toBeTruthy();
    });

    it('should call deleteSpark with correct URL', () => {
      // Act
      service.deleteSpark(empId, sparkId, userId).subscribe();
      expect(globalResponseHandlerService.encriptData).toHaveBeenCalledWith(Version2.Version3, Encryption.Version, Encryption.VersionKey);
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.SparkAnEmployee + empId + '/' + sparkId + '/' + userId);
      expect(req.request.method).toBe("DELETE");
      req.flush({ "message": "Spark deleted successfully.", "status": 200, "data": {} });
      httpTestingController.verify();
    });

    it('should be DELETE method', () => {
      service.deleteSpark(empId, sparkId, userId).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.SparkAnEmployee + empId + '/' + sparkId + '/' + userId);
      expect(req.request.method).toBe("DELETE");
    });
  });

  describe('deleteSparkAttachment', () => {

    it('should be create deleteSparkAttachment()', () => {
      expect(service.deleteSparkAttachment).toBeTruthy();
    });

    it('should call deleteSparkAttachment with correct URL', () => {
      // Act
      service.deleteSparkAttachment(DELETEATTACHMENT).subscribe();
      expect(globalResponseHandlerService.encriptData).toHaveBeenCalledWith(Version2.Version3, Encryption.Version, Encryption.VersionKey);
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.SparkAnEmployeeAttachment);
      adapter.toResponse.and.returnValue(DELETEATTACHMENT);
      expect(req.request.method).toBe("PUT");
      req.flush({ "message": "Spark deleted successfully.", "status": 200, "data": {} });
      httpTestingController.verify();
    });

    it('should be DELETE method', () => {
      service.deleteSparkAttachment(DELETEATTACHMENT).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.SparkAnEmployeeAttachment);
      expect(req.request.method).toBe("PUT");
    });
  });

});

let CATEGORIES: Category[] = [
  {
    "id": 1,
    "category": "Performance"
  },
  {
    "id": 2,
    "category": "Attitude"
  },
  {
    "id": 3,
    "category": "Maintenance"
  }, {
    "id": 4,
    "category": "General"
  }
]
let CLASSIFICATIONS: Classification[] = [
  {
    "classificationId": 1,
    "classification": "1:1 Meeting"
  },
  {
    "classificationId": 2,
    "classification": "Praise"
  },
  {
    "classificationId": 3,
    "classification": "Corrective Action"
  }, {
    "classificationId": 4,
    "classification": "Observation"
  }
]
let EmployeeSparks: SparkAnEmployee[] = [{
  "empId": 10,
  "sparkId": 1,
  "categoryId": 1,
  "category": "Performance",
  "sparkDate": "Wed Dec 18 2019 12:56:47 GMT+0530 (India Standard Time)",
  "sparkBy": 8,
  "givenBy": "Rajesh Chapaneria",
  "sparkByFirstName": "Rajesh",
  "sparkByLastName": "Chapaneria",
  "spark": "dddd",
  "classificationId": 1,
  "classification": "1:1 Meeting",
  "attachmentName": "",
  "path": "",
  "attachmentPath": "",
  "cloudFilePath": "",
  "isEnabledAction": false,
  "isEditable": false,
  "isDeletable": false,
  "isPreviewFile": false,
  "classifications": [],
  "categories": [],
  "createdBy": 0,
  "updatedBy": 0,
  "sparkByImgPath": "",
  "profileName": "RC",
  "sendSpark": false,
  "sparkPrivacy": 1,
  "isSparkSent": false
}]
let ADDSPARK: RequestModel = {
  "empId": 10,
  "sparkId": 0,
  "categoryId": 1,
  "classificationId": 2,
  "sparkBy": 1,
  "sparkDate": "12-20-2019 13:12:22",
  "remarks": "ssssss",
  "documentName": "",
  "documentContents": "",
  "cloudFilePath": "",
  "createdBy": 1,
  "updatedBy": 0,
  "sendSpark": false,
  "requestId": 0,
  "sparkPrivacy": 0
}
let UPDATESPARK: RequestModel = {
  "empId": 10,
  "sparkId": 0,
  "categoryId": 1,
  "classificationId": 2,
  "sparkBy": 1,
  "sparkDate": "12-20-2019 13:12:22",
  "remarks": "ssssss",
  "documentName": "",
  "documentContents": "",
  "cloudFilePath": "",
  "createdBy": 0,
  "updatedBy": 1,
  "sendSpark": false,
  "requestId": 0,
  "sparkPrivacy": 0
}
let DELETEATTACHMENT: RequestModel = {
  "empId": 10,
  "sparkId": 11,
  "categoryId": 2,
  "classificationId": 1,
  "sparkBy": 1,
  "sparkDate": "12-20-2019 13:23:19",
  "remarks": "dd",
  "documentName": "9d881438-82a2-44f0-934e-ab9b00589011$Dev 1Rivet.xlsx",
  "documentContents": "",
  "cloudFilePath": "",
  "createdBy": 0,
  "updatedBy": 1,
  "sendSpark": false,
  "requestId": 0,
  "sparkPrivacy": 0
}