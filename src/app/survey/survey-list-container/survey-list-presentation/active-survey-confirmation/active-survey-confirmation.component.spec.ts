import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSurveyConfirmationComponent } from './active-survey-confirmation.component';

describe('ActiveSurveyConfirmationComponent', () => {
  let component: ActiveSurveyConfirmationComponent;
  let fixture: ComponentFixture<ActiveSurveyConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveSurveyConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveSurveyConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
