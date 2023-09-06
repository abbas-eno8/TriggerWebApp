import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamsListContainer } from './teams-list.container';
import { TeamsService } from '../teams-service/teams.service';
import { LoaderService } from '../../core/loader/loader.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('TeamsListContainer', () => {
  let component: TeamsListContainer;
  let fixture: ComponentFixture<TeamsListContainer>;
  let teamsService, loaderService, globalResponseHandlerService;
  beforeEach(async(() => {
    loaderService = jasmine.createSpyObj(['emitIsLoaderShown']);
    teamsService = jasmine.createSpyObj(['getTeams', 'inactiveTeam']);
    globalResponseHandlerService = jasmine.createSpyObj(['getUser', 'getApiResponse']);
    TestBed.configureTestingModule({
      declarations: [TeamsListContainer],
      providers: [
        { provide: TeamsService, useValue: teamsService },
        { provide: LoaderService, useValue: loaderService },
        { provide: GlobalResponseHandlerService, useValue: globalResponseHandlerService }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    globalResponseHandlerService.getUser.and.returnValue(1);
    loaderService.emitIsLoaderShown.and.returnValue(true);
    teamsService.getTeams.and.returnValue(of(''));
    fixture = TestBed.createComponent(TeamsListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('deleteTeam', () => {

    it('should create deleteTeam', () => {
      expect(component.deleteTeam).toBeTruthy();
    });
    it('should be check deleteTeam method work properly with 200 status code', () => {
      globalResponseHandlerService.getApiResponse.and.returnValue(true);
      teamsService.inactiveTeam.and.returnValue(of(''));
      teamsService.getTeams.and.returnValue(of(''));
      component.deleteTeam(1);
    });

    it('should be check deleteTeam method work properly with another status code', () => {
      globalResponseHandlerService.getApiResponse.and.returnValue(false);
      teamsService.inactiveTeam.and.returnValue(of(''));
      component.deleteTeam(1);
    });
  });
});
