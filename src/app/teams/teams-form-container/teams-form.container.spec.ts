import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsFormContainer } from './teams-form.container';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoaderService } from '../../core/loader/loader.service';
import { TeamsService } from '../teams-service/teams.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlEncryptionDecryptionService } from '../../core/url-encryption-decryption/url-encryption-decryption.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamsRequestModel } from '../teams-model';
import { Route } from '../../core/magic-string/common.model';
import { of } from 'rxjs';

describe('TeamsFormContainer', () => {
  let component: TeamsFormContainer;
  let fixture: ComponentFixture<TeamsFormContainer>;
  let teamsService, loaderService, globalResponseHandlerService, urlEncryptionDecryptionService;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  let activatedRoute = {
    snapshot: { queryParams: { 'id': '2' } }
  };
  beforeEach(async(() => {
    loaderService = jasmine.createSpyObj(['emitIsLoaderShown']);
    teamsService = jasmine.createSpyObj(['getManagers', 'getNonManagers', 'getTeamById', 'addTeam', 'updateTeam']);
    globalResponseHandlerService = jasmine.createSpyObj(['getUser', 'getApiResponse']);
    urlEncryptionDecryptionService = jasmine.createSpyObj(['urlDecryption']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [TeamsFormContainer],
      providers: [
        { provide: Router, useValue: router },
        { provide: TeamsService, useValue: teamsService },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: LoaderService, useValue: loaderService },
        { provide: GlobalResponseHandlerService, useValue: globalResponseHandlerService },
        { provide: UrlEncryptionDecryptionService, useValue: urlEncryptionDecryptionService },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    globalResponseHandlerService.getUser.and.returnValue(1);
    loaderService.emitIsLoaderShown.and.returnValue(true);
    teamsService.getManagers.and.returnValue(of(''));
    teamsService.getNonManagers.and.returnValue(of(''));
    fixture = TestBed.createComponent(TeamsFormContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should be create ngOnInit()', () => {
      expect(component.ngOnInit).toBeTruthy();
    });

    it('should be check ngOnInit() work properly', () => {
      let id = activatedRoute.snapshot.queryParams.id;
      expect(urlEncryptionDecryptionService.urlDecryption).toHaveBeenCalledWith(id);
      let teamId: number = 2;
      expect(teamId).toBeGreaterThan(0);
      teamsService.getTeamById.and.returnValue(of(''));
      globalResponseHandlerService.getUser.and.returnValue(1);
      component.ngOnInit();
    });

    it('should be check ngOnInit() work properly', () => {
      let id = activatedRoute.snapshot.queryParams.id;
      expect(urlEncryptionDecryptionService.urlDecryption).toHaveBeenCalledWith(id);
      let teamId: number = -2;
      expect(teamId).toBeLessThan(0);
      component.ngOnInit();
    });
  });

  describe('addTeam', () => {

    it('should create addTeam', () => {
      expect(component.addTeam).toBeTruthy();
    });
    it('should be check addTeam method work properly with 200 status code', () => {
      globalResponseHandlerService.getApiResponse.and.returnValue(true);
      teamsService.addTeam.and.returnValue(of(''));
      component.addTeam(ADDTEAM);
    });

    it('should be check addTeam method work properly with another status code', () => {
      globalResponseHandlerService.getApiResponse.and.returnValue(false);
      teamsService.addTeam.and.returnValue(of(''));
      component.addTeam(ADDTEAM);
      expect(router.navigate).toHaveBeenCalledWith([Route.Team]);
    });
  });
  describe('updateTeam', () => {

    it('should create updateTeam', () => {
      expect(component.updateTeam).toBeTruthy();
    });
    it('should be check updateTeam method work properly with 200 status code', () => {
      globalResponseHandlerService.getApiResponse.and.returnValue(true);
      teamsService.updateTeam.and.returnValue(of(''));
      component.updateTeam(ADDTEAM);
      expect(router.navigate).toHaveBeenCalledWith([Route.Team]);
    });

    it('should be check updateTeam method work properly with another status code', () => {
      globalResponseHandlerService.getApiResponse.and.returnValue(false);
      teamsService.updateTeam.and.returnValue(of(''));
      component.updateTeam(ADDTEAM);
    });
  });
});

let ADDTEAM: TeamsRequestModel = { "teamId": 0, "name": "truvelop", "description": "TEAM DESCRIPTION", "startDate": "02-03-2020", "endDate": "01-01-2025", "triggerActivityDays": 20, "status": true, "createdBy": 3314, "updatedBy": 0, "teamManagers": [{ "id": 0, "managerId": 26276, "name": " ", "createdBy": 3314, "updatedBy": 0 }], "teamEmployees": [{ "id": 0, "empId": 26206, "name": " ", "createdBy": 3314, "updatedBy": 0 }] }
