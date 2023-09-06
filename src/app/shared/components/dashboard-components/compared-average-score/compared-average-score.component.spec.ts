import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparedAverageScoreComponent } from './compared-average-score.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ComparedAverageScoreComponent', () => {
  let component: ComparedAverageScoreComponent;
  let fixture: ComponentFixture<ComparedAverageScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparedAverageScoreComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparedAverageScoreComponent);
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
