import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyListContainer } from './survey-list-container';

describe('SurveyListContainer', () => {
  let component: SurveyListContainer;
  let fixture: ComponentFixture<SurveyListContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyListContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
