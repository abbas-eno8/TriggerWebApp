import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyDesktopPresentation } from './survey-desktop-presentation';

describe('SurveyDesktopPresentation', () => {
  let component: SurveyDesktopPresentation;
  let fixture: ComponentFixture<SurveyDesktopPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyDesktopPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyDesktopPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
