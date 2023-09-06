import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveyDetailsPresentation } from './survey-details.presentation';

describe('SurveyDeatilsPresentation', () => {
  let component: SurveyDetailsPresentation;
  let fixture: ComponentFixture<SurveyDetailsPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyDetailsPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyDetailsPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
