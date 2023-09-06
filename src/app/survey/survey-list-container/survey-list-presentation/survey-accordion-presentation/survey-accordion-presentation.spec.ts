import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyAccordionPresentation } from './survey-accordion-presentation';

describe('SurveyAccordionPresentation', () => {
  let component: SurveyAccordionPresentation;
  let fixture: ComponentFixture<SurveyAccordionPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyAccordionPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyAccordionPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
