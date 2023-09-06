import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFilterListComponent } from './employee-filter-list.component';

describe('EmployeeFilterListComponent', () => {
  let component: EmployeeFilterListComponent;
  let fixture: ComponentFixture<EmployeeFilterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFilterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
