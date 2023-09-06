import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveyPreviewPresentation } from './survey-preview-presentation';

describe('SurveyPreviewPresentation', () => {
  let component: SurveyPreviewPresentation;
  let fixture: ComponentFixture<SurveyPreviewPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPreviewPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPreviewPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
