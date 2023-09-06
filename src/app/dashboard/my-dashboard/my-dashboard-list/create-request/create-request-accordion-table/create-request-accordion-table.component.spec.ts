import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestAccordionTableComponent } from './create-request-accordion-table.component';

describe('CreateRequestAccordionTableComponent', () => {
  let component: CreateRequestAccordionTableComponent;
  let fixture: ComponentFixture<CreateRequestAccordionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRequestAccordionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRequestAccordionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
