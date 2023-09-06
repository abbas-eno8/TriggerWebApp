import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgByAverageScoreComponent } from './org-by-average-score.component';

describe('OrgByAverageScoreComponent', () => {
  let component: OrgByAverageScoreComponent;
  let fixture: ComponentFixture<OrgByAverageScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgByAverageScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgByAverageScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
