import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentYearAverageScoreComponent } from './current-year-average-score.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CurrentYearAverageScoreComponent', () => {
  let component: CurrentYearAverageScoreComponent;
  let fixture: ComponentFixture<CurrentYearAverageScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentYearAverageScoreComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentYearAverageScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should be create ngOnInit()', () => {
      expect(component.ngOnInit).toBeTruthy();
    });

    it('should be check ngOnInit() work properly', () => {
      component.ngOnInit();
    });
  });
});
