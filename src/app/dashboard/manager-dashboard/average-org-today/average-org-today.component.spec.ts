import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AverageOrgTodayComponent } from './average-org-today.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { equal } from 'assert';
import { CompareString } from '../../../core/magic-string/common.model';
import { TooltioHeaderAverageOrgToday } from '../../../shared/tooltip/tooltip-model';

describe('AverageOrgTodayComponent', () => {
  let component: AverageOrgTodayComponent;
  let fixture: ComponentFixture<AverageOrgTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AverageOrgTodayComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageOrgTodayComponent);
    component = fixture.componentInstance;
    //expect(component.showToolTip).toBe(false);
    expect(component.isToDate).toBe(CompareString.To_Date);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor', () => {
    it('should have as pageTitle value', () => {
      expect(component.pageTitle).toBe(TooltioHeaderAverageOrgToday);
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

    // it('should test the openModal emitter with a simple subscribe', async(() => {
    //   component.openModal.subscribe(event => {
    //     expect(event)
    //   });
    // }));
  })


  describe("onclickremoveTile()", () => {
    it('should create onclickremoveTile()', () => {
      expect(component.onclickremoveTile).toBeTruthy();
    });

    it('should be check onclickremoveTile() method work properly', () => {
      spyOn(component.removeTile, 'emit');
      component.onclickremoveTile();
      expect(component.removeTile.emit).toHaveBeenCalledWith('average-org-today');
    });
  })

  // describe("onClickOpenModal()", () => {
  //   it('should create onClickOpenModal()', () => {
  //     expect(component.onClickOpenModal).toBeTruthy();
  //   });

  //   it('should be check onClickOpenModal() method work properly', () => {
  //     spyOn(component.openModal, 'emit');
  //     component.onClickOpenModal();
  //     expect(component.openModal.emit).toHaveBeenCalledWith('average-org-today');
  //   });
  // })
});
