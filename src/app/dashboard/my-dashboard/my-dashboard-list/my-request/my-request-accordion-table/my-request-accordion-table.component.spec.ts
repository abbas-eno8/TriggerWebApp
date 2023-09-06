import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRequestAccordionTableComponent } from './my-request-accordion-table.component';

describe('MyRequestAccordionTableComponent', () => {
  let component: MyRequestAccordionTableComponent;
  let fixture: ComponentFixture<MyRequestAccordionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRequestAccordionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRequestAccordionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
