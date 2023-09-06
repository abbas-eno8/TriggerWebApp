import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyLineGraphComponent } from './yearly-line-graph.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('YearlyLineGraphComponent', () => {
  let component: YearlyLineGraphComponent;
  let fixture: ComponentFixture<YearlyLineGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YearlyLineGraphComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    it('will have the both `ViewChild`s defined', () => {
      expect(fixture.componentInstance.chartTargetYearly).toBeDefined();
    });
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  describe('ngOnInit', () => {

    // it('should be create ngOnInit()', () => {
    //   expect(component.ngOnInit).toBeTruthy();
    // });

    // it('should be check ngOnInit() work properly', () => {
    //   spyOn(component, 'onClickgetYearlyMap');
    //   component.ngOnInit();
    //   component.onClickgetYearlyMap([1,2,3],component.chartTargetYearly)
    // });
  });
});
