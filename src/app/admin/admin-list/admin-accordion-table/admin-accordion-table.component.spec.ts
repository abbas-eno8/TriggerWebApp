import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccordionTableComponent } from './admin-accordion-table.component';

describe('AdminAccordionTableComponent', () => {
  let component: AdminAccordionTableComponent;
  let fixture: ComponentFixture<AdminAccordionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAccordionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccordionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
