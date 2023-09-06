/**
@author : Anjali Tandel
@class : TeamMemberService
@description : TeamMemberService service created for TeamMember-list & column-configuration, send mail to temam-member, delete & advanced filter team-members.
**/
import { TestBed, inject } from '@angular/core/testing';
import { TeamMemberService } from './team-member.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnvironmentConfigService } from '../../../core/environment-config/environment-config.service';
import { TeamMembersAdapter } from '../team-member-adapter/team-member-adapter';
import { ApiURL } from '../../../core/magic-string/common.model';
import { Department, ColumnConfiguration, TeamMemberColumns, TeamMembers, DimensionList, SendMail } from '../team-member-model';
import { HttpClient } from 'selenium-webdriver/http';

describe('TeamMemberService', () => {
  let service, environmentConfigService, listadapter;
  let httpTestingController: HttpTestingController;
  let queryString: string;
  let clientId: number, userId: number, empId: number, managerId: number;
  beforeEach(() => {
    environmentConfigService = jasmine.createSpyObj(['getBaseUrl']);
    listadapter = jasmine.createSpyObj(['customColumnResponse', 'departmentResponse', 'toResponse', 'toElementResponse']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TeamMemberService,
        { provide: EnvironmentConfigService, useValue: environmentConfigService },
        { provide: TeamMembersAdapter, useValue: listadapter }
      ]
    })
      .compileComponents();
    httpTestingController = TestBed.get(HttpTestingController);
    environmentConfigService.getBaseUrl.and.returnValue('http://localhost:4200/');
    service = TestBed.get(TeamMemberService);
    clientId = 1;
    userId = 2;
    empId = 10;
    managerId = 2;
    queryString = '';
  });

  it('should be created', inject([TeamMemberService], (service: TeamMemberService) => {
    expect(service).toBeTruthy();
  }));

  describe('getCustomColumn', () => {

    it('should be create getCustomColumn()', () => {
      expect(service.getCustomColumn).toBeTruthy();
    });
    it('should call getCustomColumn with correct URL', () => {
      // Act
      service.getCustomColumn(clientId, empId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.CustomColumnConfig + clientId + '/' + empId);
      listadapter.customColumnResponse.and.returnValue(CUSTOMCOLUMNS);
      req.flush(CUSTOMCOLUMNS);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getCustomColumn(clientId, empId).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.CustomColumnConfig + clientId + '/' + empId);
      expect(req.request.method).toBe("GET");
    });
  });

  describe('customColumnConfiguration', () => {
    it('should be create customColumnConfiguration()', () => {
      expect(service.customColumnConfiguration).toBeTruthy();
    });

    it('should call customColumnConfiguration with correct URL', () => {
      // Act
      service.customColumnConfiguration(CUSTOMCOLUMNS_CONFIGURATION, clientId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.CustomColumnConfig);
      req.flush({ "message": "Team Configuration updated successfully.", "status": 200, "data": {} });
      httpTestingController.verify();
    });
  });

  describe('getDepartmentByClientId', () => {

    it('should be create getDepartmentByClientId()', () => {
      expect(service.getDepartmentByClientId).toBeTruthy();
    });
    it('should call getDepartmentByClientId with correct URL', () => {
      // Act
      service.getDepartmentByClientId(clientId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Department + clientId);
      listadapter.departmentResponse.and.returnValue(DEPARTMENT);
      req.flush(DEPARTMENT);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getDepartmentByClientId(clientId).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Department + clientId);
      expect(req.request.method).toBe("GET");
    });
  });

  describe('getTeamMembers', () => {

    it('should be create getTeamMembers()', () => {
      expect(service.getTeamMembers).toBeTruthy();
    });
    it('should call getTeamMembers with correct URL', () => {
      // Act
      service.getTeamMembers(queryString).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Employees + queryString);
      listadapter.toResponse.and.returnValue(MEMBERS);
      req.flush(MEMBERS);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getTeamMembers(queryString).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Employees + queryString);
      expect(req.request.method).toBe("GET");
    });
  });

  describe('get getDashboardTeamMembers', () => {

    it('should be create getDashboardTeamMembers()', () => {
      expect(service.getDashboardTeamMembers).toBeTruthy();
    });

    it('should call getDashboardTeamMembers with correct URL', () => {
      // Act
      service.getDashboardTeamMembers(queryString).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.DashboardTeamMember + queryString);
      listadapter.toResponse.and.returnValue(MEMBERS);
      req.flush(MEMBERS);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getDashboardTeamMembers(queryString).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.DashboardTeamMember + queryString);
      expect(req.request.method).toBe("GET");
    });
  });

  describe('sendEmail', () => {
    it('should be create sendEmail()', () => {
      expect(service.sendEmail).toBeTruthy();
    });

    it('should call sendEmail with correct URL', () => {
      // Act
      service.sendEmail(userId, SEND_MAIL).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.SendMail + userId);
      req.flush({ "message": "Team Configuration updated successfully.", "status": 200, "data": {} });
      httpTestingController.verify();
    });
  });

  describe('getFilterElement', () => {

    it('should be create getFilterElement()', () => {
      expect(service.getFilterElement).toBeTruthy();
    });
    it('should call getFilterElement with correct URL', () => {
      // Act
      service.getFilterElement().subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.PermissionwiseDimensionElements);
      listadapter.toElementResponse.and.returnValue(DIMENSION);
      req.flush(DIMENSION);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getFilterElement().subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.PermissionwiseDimensionElements);
      expect(req.request.method).toBe("GET");
    });
  });

});

let CUSTOMCOLUMNS: TeamMemberColumns[] = [{ "empId": 1065, "columnId": 1, "property": "employeeId", "column": "ID", "position": 1, "hidden": true, "widthClass": "id-column-width mx-auto text-center" }, { "empId": 1065, "columnId": 2, "property": "teamMemberName", "column": "NAME", "position": 2, "hidden": true, "widthClass": "normal-column-width" }, { "empId": 1065, "columnId": 4, "property": "position", "column": "POSITION", "position": 3, "hidden": true, "widthClass": "position-column-width" }, { "empId": 1065, "columnId": 3, "property": "managerName", "column": "MANAGER", "position": 4, "hidden": true, "widthClass": "normal-column-width" }, { "empId": 1065, "columnId": 5, "property": "department", "column": "DEPARTMENT", "position": 5, "hidden": true, "widthClass": "position-column-width" }, { "empId": 1065, "columnId": 6, "property": "lastEvaluationDate", "column": "LAST EVALUATION DATE", "position": 6, "hidden": true, "widthClass": "evaluat-column-width" }, { "empId": 1065, "columnId": 7, "property": "ratingCompleted", "column": "RATING COMPLETED", "position": 7, "hidden": true, "widthClass": "evaluat-column-width" }, { "empId": 1065, "columnId": 8, "property": "averageScore", "column": "AVERAGE SCORE", "position": 8, "hidden": true, "widthClass": "position-column-width" }, { "empId": 1065, "columnId": 9, "property": "lastEvaluation", "column": "LAST EVALUATION", "position": 9, "hidden": true, "widthClass": "position-column-width" }, { "empId": 1065, "columnId": 10, "property": "noOfSpark", "column": "TOTAL SPARKS", "position": 10, "hidden": true, "widthClass": "position-column-width" }, { "empId": 1065, "columnId": 11, "property": "lastSparkDate", "column": "LAST SPARK DATE", "position": 11, "hidden": true, "widthClass": "position-column-width" }]
let CUSTOMCOLUMNS_CONFIGURATION: ColumnConfiguration[] = [{ "empId": 1065, "columnId": 1, "columnSequence": 1, "CreatedBy": 145 }, { "empId": 1065, "columnId": 2, "columnSequence": 2, "CreatedBy": 145 }, { "empId": 1065, "columnId": 6, "columnSequence": 3, "CreatedBy": 145 }, { "empId": 1065, "columnId": 7, "columnSequence": 4, "CreatedBy": 145 }]
let DEPARTMENT: Department[] = [{ "id": 5, "department": "Human Resources" }, { "id": 6, "department": "DEV" }, { "id": 7, "department": "DEMOTest" }, { "id": 9, "department": "Acc DEPT" }, { "id": 10, "department": "Test One" }, { "id": 11, "department": "Management" }, { "id": 12, "department": "QA" }, { "id": 13, "department": "test test" }, { "id": 14, "department": "Testing" }, { "id": 15, "department": "New Test" }, { "id": 16, "department": "Test Mihir" }, { "id": 17, "department": "KPone" }, { "id": 19, "department": "Mihir Test twoo" }, { "id": 21, "department": "Test eleven" }, { "id": 22, "department": "Test twelve" }, { "id": 23, "department": "test kalpesh" }, { "id": 24, "department": "KPTwo" }, { "id": 25, "department": "KPThree" }, { "id": 26, "department": "angular" }, { "id": 27, "department": "HR" }, { "id": 28, "department": "TestingTriggerAdmin" }];
let MEMBERS: TeamMembers[] = [{ "empId": 1235, "employeeId": "1235", "teamMemberName": "New NonmanagerOne", "teamMemberFirstName": "New", "teamMemberLastName": "NonmanagerOne", "email": "kalpesh.ahir@1rivet.com", "managerName": "QAK AdminK", "managerFirstName": "QAK", "managerLastName": "AdminK", "position": "non manager", "department": "KPTwo", "lastEvaluationDate": "02/28/2020", "managerLastAssessedDate": "02/28/2020", "ratingCompleted": "11", "averageScore": "C+", "lastEvaluation": "B", "empRelation": 1, "teamType": 0, "currentSalary": 0, "departmentId": 24, "roleId": 5, "managerId": 1065, "empStatus": true, "isMailSent": true, "sendSpark": true, "sendTrigger": true, "noOfSpark": "14", "lastSparkDate": "02/26/2020", "isEditableSalary": false, "isEditable": false, "isDeletable": false, "isTriggerEmployee": false, "isDisplayEmployeeDashboard": false, "isDisabledAction": false, "isDisaplyTriggerScore": false, "isSparkViewable": false, "isSparkAddable": false, "isSparkEditable": false, "isSparkDeletable": false, "isChecked": false, "protectionLevel": 1 }]
let DIMENSION: DimensionList[] = [{ "dimensionId": 2, "dimensionName": "Relation", "dimensionElements": [{ "elementName": "Direct", "elementId": 1, "checked": false }, { "elementName": "Hierarchal", "elementId": 2, "checked": false }, { "elementName": "Indirect", "elementId": 3, "checked": false }] }, { "dimensionId": 3, "dimensionName": "Department", "dimensionElements": [{ "elementName": "Inside", "elementId": 1, "checked": false }, { "elementName": "Outside", "elementId": 2, "checked": false }] }, { "dimensionId": 5, "dimensionName": "Protection Level", "dimensionElements": [{ "elementName": "Low", "elementId": 1, "checked": false }, { "elementName": "Medium", "elementId": 2, "checked": false }, { "elementName": "High", "elementId": 3, "checked": false }] }];
let SEND_MAIL: SendMail = { 'companyId': 1, 'empIdlist': "1,25,6" }