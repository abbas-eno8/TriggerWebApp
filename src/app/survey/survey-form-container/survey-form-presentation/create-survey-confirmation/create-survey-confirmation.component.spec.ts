import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSurveyConfirmationComponent } from './create-survey-confirmation.component';

describe('CreateSurveyConfirmationComponent', () => {
  let component: CreateSurveyConfirmationComponent;
  let fixture: ComponentFixture<CreateSurveyConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSurveyConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSurveyConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
