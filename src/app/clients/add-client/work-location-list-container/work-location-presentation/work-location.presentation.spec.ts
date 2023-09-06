import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLocationPresentation } from './work-location.presentation';

describe('WorkLocationPresentation', () => {
  let component: WorkLocationPresentation;
  let fixture: ComponentFixture<WorkLocationPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkLocationPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkLocationPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
