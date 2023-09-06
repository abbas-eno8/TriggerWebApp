import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordianViewPresentation } from './accordian-view.presentation';

describe('AccordianViewPresentation', () => {
  let component: AccordianViewPresentation;
  let fixture: ComponentFixture<AccordianViewPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordianViewPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordianViewPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
