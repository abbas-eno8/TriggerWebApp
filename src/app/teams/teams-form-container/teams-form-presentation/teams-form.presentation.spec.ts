import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsFormPresentation } from './teams-form.presentation';

describe('TeamsFormPresentation', () => {
  let component: TeamsFormPresentation;
  let fixture: ComponentFixture<TeamsFormPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsFormPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsFormPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

// https://medium.com/frontend-fun/angular-unit-testing-jasmine-karma-step-by-step-e3376d110ab4