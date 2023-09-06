import { TestBed, inject } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvironmentConfigService } from '../../core/environment-config/environment-config.service';
import { TeamDashboardAdapter } from '../dashboard-adapter/dashboard-adapter';
import { ApiURL, Version2 } from '../../core/magic-string/common.model';
import { ResponseModel } from '../../teams/teams-model';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { Encryption } from '../../core/magic-string/common-validation-model';

describe('DashboardService', () => {
    let service, environmentConfigService, adapter, globalResponseHandlerService;
    let httpTestingController: HttpTestingController;
    let clientId: number, userId: number, requestId: number, actionId: number, empId: number, yearId: number, teamId: number;
    beforeEach(() => {
        environmentConfigService = jasmine.createSpyObj(['getBaseUrl']);
        adapter = jasmine.createSpyObj(['toResponse']);
        globalResponseHandlerService = jasmine.createSpyObj(['encriptData']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                DashboardService,
                { provide: EnvironmentConfigService, useValue: environmentConfigService },
                { provide: TeamDashboardAdapter, useValue: adapter },
                { provide: GlobalResponseHandlerService, useValue: globalResponseHandlerService },
            ]
        }).compileComponents();
        httpTestingController = TestBed.get(HttpTestingController);
        environmentConfigService.getBaseUrl.and.returnValue('http://localhost:4200/');
        service = TestBed.get(DashboardService);
        clientId = 1;
        empId = 2;
        userId = 2;
        yearId = 2018;
        teamId = 2;
    });

    it('should be created', inject([DashboardService], (service: DashboardService) => {
        expect(service).toBeTruthy();
    }));

    describe('getTeams', () => {

        it('should be create getTeams()', () => {
            expect(service.getTeams).toBeTruthy();
        });
        it('should call getTeams with correct URL', () => {
            // Act
            service.getTeams(clientId, yearId).subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.TeamDashboard + clientId + '/' + yearId);
            adapter.toResponse.and.returnValue(TEAMS);
            req.flush(TEAMS);
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        });

        it('should be GET method', () => {
            service.getTeams(clientId, yearId).subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.TeamDashboard + clientId + '/' + yearId);
            expect(req.request.method).toBe("GET");
        });
    });

    describe('getYear', () => {

        it('should be create getYear()', () => {
            expect(service.getYear).toBeTruthy();
        });
        it('should call getYear with correct URL', () => {
            // Act
            service.getYear(clientId).subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.TeamAssessmentYear + clientId);
            req.flush(TEAMS);
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        });

        it('should be GET method', () => {
            service.getYear(clientId).subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.TeamAssessmentYear + clientId);
            expect(req.request.method).toBe("GET");
        });
    });

    describe('getTeamDashboard', () => {

        it('should be create getTeamDashboard()', () => {
            expect(service.getTeamDashboard).toBeTruthy();
        });
        it('should call getTeamDashboard with correct URL', () => {
            // Act
            service.getTeamDashboard(clientId, yearId, teamId).subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.TeamDashboard + clientId + '/' + yearId + '/' + teamId);
            adapter.toResponse.and.returnValue(TEAMDASHBOARD);
            req.flush(TEAMDASHBOARD);
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        });

        it('should be GET method', () => {
            service.getTeamDashboard(clientId, yearId, teamId).subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.TeamDashboard + clientId + '/' + yearId + '/' + teamId);
            expect(req.request.method).toBe("GET");
        });
    });

    describe('getManagerList', () => {

        it('should be create getManagerList()', () => {
            expect(service.getManagerList).toBeTruthy();
        });
        it('should call getManagerList with correct URL', () => {
            // Act
            service.getManagerList(empId, actionId).subscribe();
            expect(globalResponseHandlerService.encriptData).toHaveBeenCalledWith(Version2.Version3, Encryption.Version, Encryption.VersionKey);
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.NonmanagerDashboardManagerList + empId + '/' + actionId);
            req.flush(TEAMDASHBOARD);
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        });

        it('should be GET method', () => {
            service.getManagerList(empId, actionId).subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.NonmanagerDashboardManagerList + empId + '/' + actionId);
            expect(req.request.method).toBe("GET");
        });
    });

    describe('sendRequestToManager', () => {
        it('should be create sendRequestToManager()', () => {
            expect(service.sendRequestToManager).toBeTruthy();
        });

        it('should call sendRequestToManager with correct URL', () => {
            // Act
            service.sendRequestToManager(requestObject).subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.myDashboarSendActionRequest);
            req.flush({ "message": "Team Configuration completed successfully.", "status": 200, "data": {} });
            httpTestingController.verify();
        });
    });

    describe('getCreateRequestList', () => {

        it('should be create getCreateRequestList()', () => {
            expect(service.getCreateRequestList).toBeTruthy();
        });
        it('should call getCreateRequestList with correct URL', () => {
            // Act
            service.getCreateRequestList().subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.CreatedRequestList);
            req.flush(TEAMDASHBOARD);
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        });

        it('should be GET method', () => {
            service.getCreateRequestList().subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.CreatedRequestList);
            expect(req.request.method).toBe("GET");
        });
    });


    describe('getMyRequestList', () => {

        it('should be create getMyRequestList()', () => {
            expect(service.getMyRequestList).toBeTruthy();
        });
        it('should call getMyRequestList with correct URL', () => {
            // Act
            service.getMyRequestList().subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.MyRequestList);
            req.flush(TEAMDASHBOARD);
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        });

        it('should be GET method', () => {
            service.getMyRequestList().subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.MyRequestList);
            expect(req.request.method).toBe("GET");
        });
    });

    describe('getActionRequestDetail', () => {

        it('should be create getActionRequestDetail()', () => {
            expect(service.getActionRequestDetail).toBeTruthy();
        });
        it('should call getActionRequestDetail with correct URL', () => {
            // Act
            service.getActionRequestDetail(requestId, empId, actionId, userId).subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.ActionRequestDetail + requestId + '/' + userId + '/' + empId + '/' + actionId);
            req.flush(TEAMDASHBOARD);
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        });

        it('should be GET method', () => {
            service.getActionRequestDetail(requestId, empId, actionId, userId).subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.ActionRequestDetail + requestId + '/' + userId + '/' + empId + '/' + actionId);
            expect(req.request.method).toBe("GET");
        });
    });

    describe('getMyDashboard', () => {

        it('should be create getMyDashboard()', () => {
            expect(service.getMyDashboard).toBeTruthy();
        });
        it('should call getMyDashboard with correct URL', () => {
            // Act
            service.getMyDashboard().subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Mydashboard);
            req.flush(TEAMDASHBOARD);
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        });

        it('should be GET method', () => {
            service.getMyDashboard().subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Mydashboard);
            expect(req.request.method).toBe("GET");
        });
    });

    describe('getDefaultWidgetPosition', () => {

        it('should be create getDefaultWidgetPosition()', () => {
            expect(service.getDefaultWidgetPosition).toBeTruthy();
        });

        it('should check getDefaultWidgetPosition method working properly', () => {
            service.getDefaultWidgetPosition(true);
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
let TEAMDASHBOARD = { "data": { "teamId": 0, "yearId": 0, "AverageScore": [{ "teamAvgscore": 17, "teamAvgscoreRank": "C" }], "AverageScoreByDay": [{ "avgScoreByDay": 19, "avgScoreByDayRank": "C+" }] }, "status": 200, "message": "Ok" }
let requestObject = {
    EmpId: 1,
    EmpIdList: ['1', '2'],
    actionid: 2,
    createdby: 1
}
