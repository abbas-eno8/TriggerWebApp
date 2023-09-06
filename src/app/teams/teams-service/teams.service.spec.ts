import { TestBed, inject, async } from '@angular/core/testing';

import { TeamsService } from './teams.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnvironmentConfigService } from '../../core/environment-config/environment-config.service';
import { TeamsListAdapter, TeamsFormAdapter } from '../teams-adapter/teams-adapter';
import { ApiURL } from '../../core/magic-string/common.model';
import { HttpClient } from '@angular/common/http';
import { ResponseModel, TeamManager, TeamEmployee, TeamsRequestModel } from '../teams-model';

describe('TeamsService', () => {
  let service, environmentConfigService, formAdapter, listadapter;
  let httpTestingController: HttpTestingController;
  let clientId: number, teamId: number, userId: number;
  beforeEach(() => {
    environmentConfigService = jasmine.createSpyObj(['getBaseUrl']);
    formAdapter = jasmine.createSpyObj(['toResponse', 'getManagers', 'getMembers']);
    listadapter = jasmine.createSpyObj(['toResponse']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TeamsService,
        { provide: EnvironmentConfigService, useValue: environmentConfigService },
        { provide: TeamsListAdapter, useValue: listadapter },
        { provide: TeamsFormAdapter, useValue: formAdapter }
      ]
    })
      .compileComponents();
    httpTestingController = TestBed.get(HttpTestingController);
    environmentConfigService.getBaseUrl.and.returnValue('http://localhost:4200/');
    service = TestBed.get(TeamsService);
    clientId = 1;
    teamId = 2;
    userId = 2;
  });

  it('should be created', inject([TeamsService], (service: TeamsService) => {
    expect(service).toBeTruthy();
  }));

  describe('getTeams', () => {

    it('should be create getTeams()', () => {
      expect(service.getTeams).toBeTruthy();
    });
    it('should call getTeams with correct URL', () => {
      // Act
      service.getTeams(clientId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.TeamConfiguration + clientId);
      listadapter.toResponse.and.returnValue(TEAMS);
      req.flush(TEAMS);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getTeams(clientId).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.TeamConfiguration + clientId);
      expect(req.request.method).toBe("GET");
    });
  });

  describe('getTeamById', () => {

    it('should be create getTeamById()', () => {
      expect(service.getTeams).toBeTruthy();
    });
    it('should call getTeamById with correct URL', () => {
      // Act
      service.getTeamById(clientId, teamId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.TeamConfiguration + + clientId + '/' + teamId);
      formAdapter.toResponse.and.returnValue(TEAMS[0]);
      req.flush(TEAMS);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getTeamById(clientId, teamId).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.TeamConfiguration + clientId + '/' + teamId);
      expect(req.request.method).toBe("GET");
    });
  });

  describe('getManagers', () => {

    it('should be create getManagers()', () => {
      expect(service.getTeams).toBeTruthy();
    });
    it('should call getManagers with correct URL', () => {
      // Act
      service.getManagers(clientId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.ActiveManagers + clientId);
      formAdapter.getManagers.and.returnValue(MANAGERS);
      req.flush(MANAGERS);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getManagers(clientId).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.ActiveManagers + clientId);
      expect(req.request.method).toBe("GET");
    });
  });

  describe('getNonManagers', () => {

    it('should be create getNonManagers()', () => {
      expect(service.getNonManagers).toBeTruthy();
    });
    it('should call getNonManagers with correct URL', () => {
      // Act
      service.getNonManagers(clientId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.NonManager + clientId);
      formAdapter.getMembers.and.returnValue(NONMANAGERS);
      req.flush(NONMANAGERS);
      httpTestingController.verify();
      expect(req.request.method).toBe('GET');
    });

    it('should be GET method', () => {
      service.getNonManagers(clientId).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.NonManager + clientId);
      expect(req.request.method).toBe("GET");
    });
  });

  describe('addTeam', () => {
    it('should be create addTeam()', () => {
      expect(service.addTeam).toBeTruthy();
    });

    it('should call addTeam with correct URL', () => {
      // Act
      service.addTeam(ADDTEAM, clientId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.TeamConfiguration + clientId);
      req.flush({ "message": "Team Configuration completed successfully.", "status": 200, "data": {} });
      httpTestingController.verify();
    });
  });

  describe('updateTeam', () => {
    it('should be create updateTeam()', () => {
      expect(service.updateTeam).toBeTruthy();
    });

    it('should call updateTeam with correct URL', () => {
      // Act
      service.updateTeam(UPDATETEAM, clientId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.TeamConfiguration + clientId);
      req.flush({ "message": "Team Configuration updated successfully.", "status": 200, "data": {} });
      httpTestingController.verify();
    });
  });

  describe('inactiveTeam', () => {

    it('should be create inactiveTeam()', () => {
      expect(service.inactiveTeam).toBeTruthy();
    });

    it('should call inactiveTeam with correct URL', () => {
      // Act
      service.inactiveTeam(clientId, teamId, userId).subscribe();
      // Assert
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.TeamConfigurationSetInactive + clientId + '/' + teamId + '/' + userId);
      expect(req.request.method).toBe("DELETE");
      req.flush({ "message": "Team is inactivated successfully.", "status": 200, "data": {} });
      httpTestingController.verify();
    });

    it('should be DELETE method', () => {
      service.inactiveTeam(clientId, teamId, userId).subscribe();
      const req = httpTestingController.expectOne(service.baseUrl + ApiURL.TeamConfigurationSetInactive + clientId + '/' + teamId + '/' + userId);
      expect(req.request.method).toBe("DELETE");
    });
  });
});

let TEAMS: ResponseModel[] = [
  {
    'teamId': 1,
    'team': "Trigger A",
    'startDate': "2019-12-20T00:00:00",
    'endDate': "2027-01-01T00:00:00",
    'activityDays': "15",
    'createdBy': "Hari Nair",
    'createdByLastName': "Nair",
    'status': "Active",
    'isActive': true,
    'managers': "Vivek Bhavsar",
    'managerIds': "9",
    'isEditable': true,
    'isDeletable': true,
  }]
let MANAGERS: TeamManager[] = [
  {
    "id": 1,
    "managerId": 1,
    "name": "Krishna Nair",
    "createdBy": 0,
    "updatedBy": 0,
  },
  {
    "id": 2,
    "managerId": 2,
    "name": "Hari Nair",
    "createdBy": 0,
    "updatedBy": 0,
  }];
let NONMANAGERS: TeamEmployee[] = [
  {
    "id": 1,
    "empId": 1,
    "name": "Jen",
    "createdBy": 0,
    "updatedBy": 0,
  },
  {
    "id": 2,
    "empId": 2,
    "name": "Denis",
    "createdBy": 0,
    "updatedBy": 0,
  }];
let ADDTEAM: TeamsRequestModel =
  {
    "teamId": 0,
    "name": "1RPP",
    "description": "TEAM DESCRIPTION",
    "startDate": "12-23-2019",
    "endDate": "12-31-2020",
    "triggerActivityDays": 20,
    "status": true,
    "createdBy": 1,
    "updatedBy": 0,
    "teamManagers": [{ "id": 0, "managerId": 9, "name": " ", "createdBy": 1, "updatedBy": 0 }],
    "teamEmployees": [{ "id": 0, "empId": 3, "name": " ", "createdBy": 1, "updatedBy": 0 }]
  };
let UPDATETEAM: TeamsRequestModel =
  {
    "teamId": 1,
    "name": "Trigger A",
    "description": "TEAM DESCRIPTION",
    "startDate": "12-20-2019",
    "endDate": "01-01-2027",
    "triggerActivityDays": 15,
    "status": true,
    "createdBy": 0,
    "updatedBy": 1,
    "teamManagers": [{ "id": 1, "managerId": 9, "name": " ", "createdBy": 0, "updatedBy": 1 }],
    "teamEmployees": [{ "id": 1, "empId": 3, "name": " ", "createdBy": 0, "updatedBy": 1 }]
  }