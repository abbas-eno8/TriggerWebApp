import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentAccordionTableComponent } from './department-accordion-table.component';

describe('DepartmentAccordionTableComponent', () => {
  let component: DepartmentAccordionTableComponent;
  let fixture: ComponentFixture<DepartmentAccordionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentAccordionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentAccordionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
