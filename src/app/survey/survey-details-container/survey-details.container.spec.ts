import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyDetailsContainer } from './survey-details.container';

describe('SurveyDetailsContainer', () => {
  let component: SurveyDetailsContainer;
  let fixture: ComponentFixture<SurveyDetailsContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyDetailsContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyDetailsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
