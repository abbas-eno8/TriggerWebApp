import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordianPresentation } from './accordian.presentation';


describe('AccordianPresentation', () => {
  let component: AccordianPresentation;
  let fixture: ComponentFixture<AccordianPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordianPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordianPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
