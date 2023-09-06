import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyFormContainer } from './survey-form-container';

describe('SurveyFormContainer', () => {
  let component: SurveyFormContainer;
  let fixture: ComponentFixture<SurveyFormContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyFormContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyFormContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
