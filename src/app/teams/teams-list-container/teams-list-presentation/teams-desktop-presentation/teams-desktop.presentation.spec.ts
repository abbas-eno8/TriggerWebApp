import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsDesktopPresentation } from './teams-desktop.presentation';

describe('TeamsDesktopPresentationComponent', () => {
  let component: TeamsDesktopPresentation;
  let fixture: ComponentFixture<TeamsDesktopPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsDesktopPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsDesktopPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
