import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeGuidanceComponent } from './employee-guidance.component';

describe('EmployeeGuidanceComponent', () => {
  let component: EmployeeGuidanceComponent;
  let fixture: ComponentFixture<EmployeeGuidanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeGuidanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeGuidanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
