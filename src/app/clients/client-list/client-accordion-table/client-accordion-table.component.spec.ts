import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccordionTableComponent } from './client-accordion-table.component';

describe('ClientAccordionTableComponent', () => {
  let component: ClientAccordionTableComponent;
  let fixture: ComponentFixture<ClientAccordionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAccordionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAccordionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
