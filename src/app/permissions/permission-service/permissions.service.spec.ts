import { TestBed, inject } from '@angular/core/testing';

import { PermissionsService } from './permissions.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvironmentConfigService } from '../../core/environment-config/environment-config.service';
import { ApiURL } from '../../core/magic-string/common.model';
import { MasterDimensionModel } from '../../masters/masters.model';
import { ActionWisePermissionModel } from '../permissions-model';

describe('PermissionsService', () => {
  let service, environmentConfigService;
  let httpTestingController: HttpTestingController;
  let clientId: number;
  beforeEach(() => {
    environmentConfigService = jasmine.createSpyObj(['getBaseUrl']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PermissionsService,
        { provide: EnvironmentConfigService, useValue: environmentConfigService },
      ]
    })
      .compileComponents();
    httpTestingController = TestBed.get(HttpTestingController);
    environmentConfigService.getBaseUrl.and.returnValue('http://localhost:4200/');
    service = TestBed.get(PermissionsService);
    clientId = 2;
  });

  it('should be created', inject([PermissionsService], (service: PermissionsService) => {
    expect(service).toBeTruthy();
  }));

  describe('getDimensions', () => {

    it('should be create getDimensions()', () => {
      expect(service.getDimensions).toBeTruthy();
    });
    it('should call getDimensions with correct URL', () => {
      // Act
      service.getDimensions().subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Dimension);
      req.flush(DIMENSION);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getDimensions().subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Dimension);
      expect(req.request.method).toBe("GET");
    });
  });

  describe('getSystemConguration', () => {

    it('should be create getSystemConguration()', () => {
      expect(service.getSystemConguration).toBeTruthy();
    });
    it('should call getSystemConguration with correct URL', () => {
      // Act
      service.getSystemConguration(clientId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.ActionPermission + clientId);
      req.flush(DIMENSION);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getSystemConguration(clientId).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.ActionPermission + clientId);
      expect(req.request.method).toBe("GET");
    });
  });

  describe('getAllActions', () => {

    it('should be create getAllActions()', () => {
      expect(service.getAllActions).toBeTruthy();
    });
    it('should call getAllActions with correct URL', () => {
      // Act
      service.getAllActions().subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.ActionPermission);
      req.flush(DIMENSION);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getAllActions().subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.ActionPermission);
      expect(req.request.method).toBe("GET");
    });
  });

  describe('getDimensionsElement', () => {

    it('should be create getDimensionsElement()', () => {
      expect(service.getDimensionsElement).toBeTruthy();
    });
    it('should call getDimensionsElement with correct URL', () => {
      // Act
      service.getDimensionsElement(clientId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.DimensionElements + clientId);
      req.flush(DIMENSION);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getDimensionsElement(clientId).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.DimensionElements + clientId);
      expect(req.request.method).toBe("GET");
    });
  });

  describe('updateSysyemConfiguration', () => {
    it('should be create updateSysyemConfiguration()', () => {
      expect(service.updateSysyemConfiguration).toBeTruthy();
    });

    it('should call updateSysyemConfiguration with correct URL', () => {
      // Act
      service.updateSysyemConfiguration(ACtIONWISEPERMISSION, clientId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.ActionPermission + clientId);
      req.flush({ "message": "Team Configuration completed successfully.", "status": 200, "data": {} });
      httpTestingController.verify();
    });
  });

});
let DIMENSION: MasterDimensionModel[] = [{ "id": 1, "dimension": "Role", "attributeModel": [{ "id": 4, "dimensionId": 1, "dimensionValueid": 4, "dimensionValues": "Executive", "isDefault": true, "orderBy": true }, { "id": 48, "dimensionId": 1, "dimensionValueid": -1, "dimensionValues": "Default User", "isDefault": true, "orderBy": false }, { "id": 3, "dimensionId": 1, "dimensionValueid": 3, "dimensionValues": "Manager", "isDefault": true, "orderBy": false }, { "id": 5, "dimensionId": 1, "dimensionValueid": 5, "dimensionValues": "Employee", "isDefault": true, "orderBy": false }, { "id": 12, "dimensionId": 1, "dimensionValueid": 9, "dimensionValues": "Project-Lead", "isDefault": false, "orderBy": false }, { "id": 27, "dimensionId": 1, "dimensionValueid": 10, "dimensionValues": "BA", "isDefault": false, "orderBy": false }, { "id": 33, "dimensionId": 1, "dimensionValueid": 14, "dimensionValues": "TestRole", "isDefault": false, "orderBy": false }, { "id": 34, "dimensionId": 1, "dimensionValueid": 15, "dimensionValues": "Associate", "isDefault": false, "orderBy": false }, { "id": 37, "dimensionId": 1, "dimensionValueid": 16, "dimensionValues": "QATestRole", "isDefault": false, "orderBy": false }, { "id": 40, "dimensionId": 1, "dimensionValueid": 17, "dimensionValues": "HOD", "isDefault": false, "orderBy": false }, { "id": 44, "dimensionId": 1, "dimensionValueid": 18, "dimensionValues": "DB", "isDefault": false, "orderBy": false }, { "id": 45, "dimensionId": 1, "dimensionValueid": 19, "dimensionValues": "CEO", "isDefault": false, "orderBy": false }, { "id": 46, "dimensionId": 1, "dimensionValueid": 20, "dimensionValues": "Tech Lead", "isDefault": false, "orderBy": false }, { "id": 49, "dimensionId": 1, "dimensionValueid": 100, "dimensionValues": "Test", "isDefault": false, "orderBy": false }], "isCollapsed": true, "accrodianIconClass": "icon-minus d-flex align-items-center", "collapseClass": "collapse show" }];
let ACtIONWISEPERMISSION: ActionWisePermissionModel[] = [
  { "id": 0, "dimensionId": 1, "dimensionValueid": 4, "actionId": 1, "dimensionType": "Role", "actions": "Evaluate Team Member", "dimensionValues": "Executive", "createdBy": 145, "result": 0, "canView": false, "canAdd": true, "canEdit": false, "canDelete": false, "isViewable": false, "isAddable": true, "isEditable": false, "isDeletabled": false, "managerId": 0 }]
