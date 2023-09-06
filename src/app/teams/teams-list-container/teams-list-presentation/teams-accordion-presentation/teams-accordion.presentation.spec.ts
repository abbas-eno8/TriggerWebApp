import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamsAccordionPresentation } from './teams-accordion.presentation';
import { TeamsListPresenter } from '../../teams-list-presenter/teams-list.presenter';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TEAMS } from '../../../../core/mock-data/mock-teams';
import { of } from 'rxjs';
import { ScrollService } from '../../../../core/services/scroll.service';

describe('TeamsAccordionPresentation', () => {
  let component: TeamsAccordionPresentation;
  let fixture: ComponentFixture<TeamsAccordionPresentation>;
  let presenter, scrollService;
  let teamId: number;
  let property: string;
  beforeEach(async(() => {
    presenter = jasmine.createSpyObj(['sort', 'getDirecionIcon', 'onClickPaginationPanel', 'scrollTop', 'editTeam', 'deleteTeam']);
    teamId = 2;
    property = 'activityDays';
    TestBed.configureTestingModule({
      declarations: [TeamsAccordionPresentation],
      providers: [{ provide: TeamsListPresenter, useValue: presenter },
        { provide: ScrollService, useValue: scrollService }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsAccordionPresentation);
    component = fixture.componentInstance;
    component = new TeamsAccordionPresentation(presenter, scrollService)
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should be create ngOnInit', () => {
      expect(component.ngOnInit).toBeTruthy();
    });
  });

  describe('ngAfterViewInit', () => {

    it('should be create ngAfterViewInit', () => {
      expect(component.ngAfterViewInit).toBeTruthy();
    });

    it('should check ngAfterViewInit.bindDataSource working properly', () => {
      spyOn<any>(component, 'bindDataSource').and.returnValue(of([]));
      component.ngAfterViewInit();
    });
  });

  describe('expansionPanel', () => {

    it('should be create expansionPanel', () => {
      expect(component.expansionPanel).toBeTruthy();
    });

    it('should check expansionPanel method working properly', () => {
      component.expansionPanel(true);
    });
  });


  describe('sort', () => {

    it('should be create sort', () => {
      expect(component.sort).toBeTruthy();
    });

    it('should check sort method working properly', () => {
      //component.teams = TEAMS;
      //let filteredTeams: any[] = presenter.sort(property,TEAMS);
      //component.sort(property);

      
      spyOn<any>(component, 'bindDataSource').and.returnValue(of([]));
      component.sort(property);
      //expect(presenter.sort).toHaveBeenCalledWith(property,TEAMS);
      //expect(component.teams.length).toEqual(filteredTeams.length);
    });
  });

  describe('getDirecionIcon', () => {

    it('should be create getDirecionIcon', () => {
      expect(component.getDirecionIcon).toBeTruthy();
    });

    it('should check getDirecionIcon method working properly', () => {
      component.getDirecionIcon(property);
      expect(presenter.getDirecionIcon).toHaveBeenCalledWith(property);
    });
  });

  describe('onClickPaginationPanel', () => {

    it('should be create onClickPaginationPanel', () => {
      expect(component.onClickPaginationPanel).toBeTruthy();
    });

    it('should check onClickPaginationPanel method working properly', () => {
      component.onClickPaginationPanel();
      expect(presenter.onClickPaginationPanel).toHaveBeenCalled;
    });
  });

  describe('pageChanged', () => {

    it('should be create pageChanged', () => {
      expect(component.pageChanged).toBeTruthy();
    });

    it('should check pageChanged method working properly', () => {
      spyOn<any>(component, 'bindDataSource').and.returnValue(of([]));
      component.pageChanged('');
    });
  });

  describe('edit', () => {

    it('should be create edit', () => {
      expect(component.edit).toBeTruthy();
    });

    it('should check edit method working properly', () => {
      component.edit(teamId);
      expect(presenter.editTeam).toHaveBeenCalledWith(teamId);
    });
  });

  describe('delete', () => {

    it('should be create delete', () => {
      expect(component.delete).toBeTruthy();
    });

    it('should check delete method working properly', () => {
      component.delete(teamId);
      expect(presenter.deleteTeam).toHaveBeenCalledWith(teamId);
    });
  });
});
