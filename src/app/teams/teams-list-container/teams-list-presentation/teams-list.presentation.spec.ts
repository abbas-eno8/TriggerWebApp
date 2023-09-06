import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsListPresentation } from './teams-list.presentation';

describe('TeamsListPresentationComponent', () => {
  let component: TeamsListPresentation;
  let fixture: ComponentFixture<TeamsListPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsListPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsListPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
