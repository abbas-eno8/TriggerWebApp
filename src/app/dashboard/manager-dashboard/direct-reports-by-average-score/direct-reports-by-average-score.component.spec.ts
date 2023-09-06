import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectReportsByAverageScoreComponent } from './direct-reports-by-average-score.component';

describe('DirectReportsByAverageScoreComponent', () => {
  let component: DirectReportsByAverageScoreComponent;
  let fixture: ComponentFixture<DirectReportsByAverageScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectReportsByAverageScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectReportsByAverageScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
