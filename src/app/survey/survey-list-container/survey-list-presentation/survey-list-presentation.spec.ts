import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyListPresentation } from './survey-list-presentation';

describe('SurveyListPresentation', () => {
  let component: SurveyListPresentation;
  let fixture: ComponentFixture<SurveyListPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyListPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyListPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
