/**
@author : Sonal Patil
@class : DepartmentService
@description :DepartmentService is created for unit test cases.
**/
import { TestBed, inject, async } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { DepartmentService } from './department.service';
import { EnvironmentConfigService } from '../../core/environment-config/environment-config.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { HttpClient } from '@angular/common/http';
import { Response } from '../../core/common.response';
import { ApiURL } from '../../core/magic-string/common.model';

describe('DepartmentService', () => {
  let environmentConfigService;
  let mockGlobalResponseHandlerService;
  let DEPARTMENT;
  let service: DepartmentService;
  let httpTestingController: HttpTestingController;
  let mockUserData: any, departmentId: any, departmentName: any, clientId: number;

  beforeEach(async(() => {
    mockUserData = {
      'userId': 1,
      'clientId': 1,
      'clientName': 'ABC',
      'userRole': 'Manager',
    };
    DEPARTMENT = {
      "message": "Ok",
      "status": 200,
      "data": [
        {
          "Id": 1,
          "companyId": 1,
          "departmentId": 1,
          "department": "Human Resources",
          "isActive": false,
          "createdBy": 0,
          "updatedBy": null,
          "result": 0
        },
        {
          "Id": 2,
          "companyId": 0,
          "departmentId": 6,
          "department": "QA",
          "isActive": false,
          "createdBy": 0,
          "updatedBy": null,
          "result": 0
        }
      ]
    };
    environmentConfigService = jasmine.createSpyObj(['getBaseUrl']);
    mockGlobalResponseHandlerService = jasmine.createSpyObj(['getUserData']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DepartmentService,
        { provide: EnvironmentConfigService, useValue: environmentConfigService },
        { provide: GlobalResponseHandlerService, useValue: mockGlobalResponseHandlerService }

      ]
    })
      .compileComponents();
    httpTestingController = TestBed.get(HttpTestingController);
    mockGlobalResponseHandlerService.getUserData.and.returnValue(mockUserData);
    environmentConfigService.getBaseUrl.and.returnValue('http://localhost:4200/');
    service = TestBed.get(DepartmentService);
    departmentId = 1;
    clientId = 2;
    departmentName = 'Human Resources';
  }));

  it('should be created', inject([DepartmentService], (service: DepartmentService) => {
    expect(service).toBeTruthy();
  }));

  describe('callGetUserData', () => {

    it('should be create callGetUserData()', () => {
      expect(service.callGetUserData).toBeTruthy();
    });

    it('should be check UserData , clientId & UserID', inject([DepartmentService], (service: DepartmentService) => {
      expect(mockGlobalResponseHandlerService.getUserData).toHaveBeenCalledWith();
      expect(environmentConfigService.getBaseUrl).toHaveBeenCalled();
      expect(service.userData.clientId).toBe(1);
      expect(service.userData.userId).toBe(1);
    }));
  });

  describe('getDeparments', () => {

    it('should be create getDepartment()', () => {
      expect(service.getDepartment).toBeTruthy();
    });

    it('should call getDepartment with correct URL', () => {
      // Act
      service.getDepartment(clientId).subscribe();

      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Department + clientId);

      req.flush({
        "Id": 5,
        "companyId": 1,
        "departmentId": 1,
        "department": "Human Resources",
        "isActive": false,
        "createdBy": 0,
        "updatedBy": null,
        "result": 0
      });
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getDepartment(clientId).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Department + clientId);
      expect(req.request.method).toBe("GET");
    });

    it(`should respond with fake Department data`, async(inject([HttpClient, HttpTestingController],
      (http: HttpClient, backend: HttpTestingController) => {
        http.get(service.baseUrl + ApiURL.Department + clientId).subscribe((next: Response) => {
          expect(next.data).toEqual(DEPARTMENT.data);
        });

        backend.match({
          url: service.baseUrl + ApiURL.Department + clientId,
          method: 'GET'
        })[0].flush(DEPARTMENT);
      })));

  });

  describe('addDepartment', () => {
    it('should be create addDepartment()', () => {
      expect(service.addDepartment).toBeTruthy();
    });
    it('should call addDepartment with correct URL', () => {
      // Act
      service.addDepartment("Human Resources", 1).subscribe();

      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Department);
      req.flush({ "message": "New Department Added successfully", "status": 200, "data": [{}] });
      httpTestingController.verify();
    });

    it('should be POST method', () => {
      service.addDepartment("Human Resources", 1).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Department);
      expect(req.request.method).toBe("POST");
    });

    it(`should respond with fake Department data`, async(inject([HttpClient, HttpTestingController],
      (http: HttpClient, backend: HttpTestingController) => {
        const body = {
          'createdBy': service.userId,
          'department': 'Angular',
          'companyId': 1
        };
        http.post(service.baseUrl + ApiURL.Department, body).subscribe((next: Response) => {
          expect(next.data.length).toEqual(1);
          expect(next.status).toEqual(200);
        });

        backend.match({
          url: service.baseUrl + ApiURL.Department,
          method: 'POST'
        })[0].flush({ "message": "New Department Added successfully", "status": 200, "data": [{}] });
      })));

  });

  describe('updateDepartment', () => {
    it('should be create updateDepartment()', () => {
      expect(service.updateDepartment).toBeTruthy();
    });

    it('should call updateDepartment with correct URL', () => {
      // Act
      service.updateDepartment(departmentName).subscribe();

      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Department);
      req.flush({ "message": "Department Updated successfully", "status": 200, "data": [{}] });
      httpTestingController.verify();
    });

    it('should be PUT method', () => {
      service.updateDepartment(departmentName).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Department);
      expect(req.request.method).toBe("PUT");
    });

    it(`should respond with fake Department data`, async(inject([HttpClient, HttpTestingController],
      (http: HttpClient, backend: HttpTestingController) => {
        const body = {
          'updatedBy': service.userId,
          'departmentId': parseInt(departmentId),
          'department': departmentName,
          'companyId': 1
        };
        http.put(service.baseUrl + ApiURL.Department, body).subscribe((next: Response) => {
          expect(next.data.length).toEqual(1);
          expect(next.status).toEqual(200);
        });

        backend.match({
          url: service.baseUrl + ApiURL.Department,
          method: 'PUT'
        })[0].flush({ "message": "Department Updated successfully", "status": 200, "data": [{}] });
      })));
  });

  describe('deleteDepartment', () => {

    it('should be create deleteDepartment()', () => {
      expect(service.deleteDepartment).toBeTruthy();
    });

    it('should call deleteDepartment with correct URL', () => {
      // Act
      service.deleteDepartment(departmentId, 1).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Department + 1 + '/' + departmentId + '/' + service.userId);
      expect(req.request.method).toBe("DELETE");
      req.flush({ "message": "Department Deleted successfully", "status": 200, "data": [{}] });
      httpTestingController.verify();
    });

    it('should be DELETE method', () => {
      service.deleteDepartment(departmentId, 1).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Department + 1 + '/' + departmentId + '/' + service.userId);
      expect(req.request.method).toBe("DELETE");
    });

    it(`should respond with fake Department data`, async(inject([HttpClient, HttpTestingController],
      (http: HttpClient, backend: HttpTestingController) => {
        http.delete(service.baseUrl + ApiURL.Department + 1 + '/' + departmentId + '/' + service.userId).subscribe((next: Response) => {
          expect(next.data.length).toEqual(1);
          expect(next.status).toEqual(200);
        });

        backend.match({
          url: service.baseUrl + ApiURL.Department + 1 + '/' + departmentId + '/' + service.userId,
          method: 'DELETE'
        })[0].flush({ "message": "Department Deleted successfully", "status": 200, "data": [{}] });
      })));

  });
  
});
