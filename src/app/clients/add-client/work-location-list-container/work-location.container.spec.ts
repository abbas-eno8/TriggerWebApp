import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLocationContainer } from './work-location.container';

describe('WorkLocationContainer', () => {
  let component: WorkLocationContainer;
  let fixture: ComponentFixture<WorkLocationContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkLocationContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkLocationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
