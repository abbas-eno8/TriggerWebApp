import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalOrgTodayComponent } from './total-org-today.component';
import { CompareString } from '../../../core/magic-string/common.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TooltioHeaderTotalOrgToday } from '../../../shared/tooltip/tooltip-model';
import { TeamDashboardAdapter } from '../../dashboard-adapter/dashboard-adapter';
import { RedirectionParam } from '../manager-dashboard-model';

describe('TotalOrgTodayComponent', () => {
  let component: TotalOrgTodayComponent;
  let fixture: ComponentFixture<TotalOrgTodayComponent>;
  let adapter;
  beforeEach(async(() => {
    adapter = jasmine.createSpyObj(['dashboardRedirectionParam']);
    TestBed.configureTestingModule({
      declarations: [TotalOrgTodayComponent],
      providers: [{ provide: TeamDashboardAdapter, useValue: adapter }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
      fixture = TestBed.createComponent(TotalOrgTodayComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor', () => {
    it('should have as pageTitle value', () => {
      expect(component.pageTitle).toBe(TooltioHeaderTotalOrgToday);
    });

    it('should isToDate have as ' + CompareString.To_Date + ' value', () => {
      expect(component.isToDate).toBe(CompareString.To_Date);
      expect(component.isToDate).not.toBe(null);
      expect(component.isToDate).not.toBe(undefined);
    });
  })

  describe('ngOnInit', () => {

    it('should be create ngOnInit()', () => {
      expect(component.ngOnInit).toBeTruthy();
    });

    it('should be check ngOnInit() work properly', () => {
      component.ngOnInit();
    });
  });

  describe("should test output emitter with subscriber", () => {

    it('should test the removeTile emitter with a simple subscribe', async(() => {
      component.removeTile.subscribe(event => {
        expect(event)
      });
    }));

    it('should test the redirectedToList emitter with a simple subscribe', async(() => {
      component.redirectedToList.subscribe(event => {
        expect(event)
      });
    }));
  })

  describe("onclickgoToNumberOfMyOrganization()", () => {
    it('should be create onclickgoToNumberOfMyOrganization()', () => {
      expect(component.onclickgoToNumberOfMyOrganization).toBeTruthy();
    });

    it('should be check onclickgoToNumberOfMyOrganization() work properly', async(() => {
      spyOn(component.redirectedToList, 'emit');
      component.onclickgoToNumberOfMyOrganization();
      adapter.dashboardRedirectionParam.and.returnValue(redirectionParam);
      expect(component.redirectedToList.emit).toHaveBeenCalled();
    }));
  })

  describe("onclickremoveTile()", () => {
    it('should be create onclickremoveTile()', () => {
      expect(component.onclickremoveTile).toBeTruthy();
    });

    it('should be check onclickremoveTile() work properly', async(() => {
      spyOn(component.removeTile, 'emit');
      component.onclickremoveTile();
      expect(component.removeTile.emit).toHaveBeenCalledWith('total-org-today');
    }));
  })
});
const redirectionParam: RedirectionParam = {
  'widgetId': 1,
  'grade': 'A',
  'month': 'Jan'
}


