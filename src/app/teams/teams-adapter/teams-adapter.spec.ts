import { TestBed, inject, async } from '@angular/core/testing';
import { TeamsListAdapter, TeamsFormAdapter } from './teams-adapter';
import { ResponseModel } from '../teams-model';

describe('TeamsListAdapter', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TeamsListAdapter
            ]
        })
            .compileComponents();
        service = TestBed.get(TeamsListAdapter);
    });

    it('should be created', inject([TeamsListAdapter], (service: TeamsListAdapter) => {
        expect(service).toBeTruthy();
    }));

    describe('toResponse', () => {

        it('should be create toResponse', () => {
            expect(service.toResponse).toBeTruthy();
        });

        it('should check toResponse method working properly with data', () => {
            spyOn(service, 'bindTeams');
            expect(RESPONSE.data.length).toBeGreaterThan(0);
            service.toResponse(RESPONSE);
            expect(service.bindTeams).toHaveBeenCalledWith([{ "teamId": 1, "name": "Truvelop", "description": "TEAM DESCRIPTION", "startDate": "2020-01-21T00:00:00", "endDate": "2022-01-01T00:00:00", "triggerActivityDays": 20, "status": true, "createdBy": 1, "updatedBy": 0, "createdByFName": "Kalpesh", "createdByLName": "Admin", "managers": "ManagerOne Kalpesh", "managerIds": "10", "result": 0, "teamManagers": [], "teamEmployees": [] }]);
        });

        it('should check toResponse method working properly with null data', () => {
            spyOn(service, 'bindTeams');
            expect(NULLRESPONSE.data.length).toBeLessThanOrEqual(0);
            service.toResponse(NULLRESPONSE);
        });
    });

    describe('bindTeams', () => {

        it('should be create bindTeams', () => {
            expect(service.bindTeams).toBeTruthy();
        });

        it('should check bindTeams method working properly', () => {
            // const result = service.bindTeams(RESPONSE.data);
            // spyOn<any>(service, 'bindTeams').and.returnValue(Observable.of(RESPONSEMODEL));
            //expect(result).toEqual(RESPONSEMODEL);
        });
    });

    describe('teams', () => {

        it('should be create teams', () => {
            expect(service.teams).toBeTruthy();
        });

        it('should check teams method working properly', () => {
            service.teams(RESPONSE);
        });
    });
});

describe('TeamsFormAdapter', () => {
    let formService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TeamsFormAdapter
            ]
        })
            .compileComponents();
        formService = TestBed.get(TeamsFormAdapter);
    });

    it('should be created', inject([TeamsFormAdapter], (service: TeamsListAdapter) => {
        expect(service).toBeTruthy();
    }));

    describe('toRequest', () => {

        it('should be create toRequest', () => {
            expect(formService.toRequest).toBeTruthy();
        });

        it('should check toRequest method working properly with data', () => {
            //formService.toRequest(RESPONSE);
        });
    });

    describe('toResponse', () => {

        it('should be create toResponse', () => {
            expect(formService.toResponse).toBeTruthy();
        });

        it('should check toResponse method working properly', () => {
            spyOn(formService, 'teams');
            formService.teams(RESPONSE);
        });
    });

    describe('teams', () => {

        it('should be create teams', () => {
            expect(formService.teams).toBeTruthy();
        });

        it('should check teams method working properly', () => {
            //formService.teams(RESPONSE);
        });
    });
});

let NULLRESPONSE: any = { "message": "Data not found.", "status": 100, "data": [] };
let RESPONSE: any = { "message": "Ok", "status": 200, "data": [{ "teamId": 1, "name": "Truvelop", "description": "TEAM DESCRIPTION", "startDate": "2020-01-21T00:00:00", "endDate": "2022-01-01T00:00:00", "triggerActivityDays": 20, "status": true, "createdBy": 1, "updatedBy": 0, "createdByFName": "Kalpesh", "createdByLName": "Admin", "managers": "ManagerOne Kalpesh", "managerIds": "10", "result": 0, "teamManagers": [], "teamEmployees": [] }] };
let RESPONSEMODEL: ResponseModel = { "teamId": 1, "team": "Truvelop", "startDate": "2020-01-21T00:00:00", "endDate": "2022-01-01T00:00:00", "activityDays": "20", "createdBy": "Kalpesh Admin", "createdByLastName": "Admin", "status": "Active", "isActive": true, "managers": "ManagerOne Kalpesh", "managerIds": "10", "isEditable": false, "isDeletable": false };
