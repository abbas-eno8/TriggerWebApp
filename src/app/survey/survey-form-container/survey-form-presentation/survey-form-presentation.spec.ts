import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyFormPresentation } from './survey-form-presentation';

describe('SurveyFormPresentation', () => {
  let component: SurveyFormPresentation;
  let fixture: ComponentFixture<SurveyFormPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyFormPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyFormPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
