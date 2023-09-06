import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyConfirmationComponent } from './survey-confirmation.component';

describe('SurveyConfirmationComponent', () => {
  let component: SurveyConfirmationComponent;
  let fixture: ComponentFixture<SurveyConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
