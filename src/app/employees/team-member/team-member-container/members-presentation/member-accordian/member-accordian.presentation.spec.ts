import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberAccordianPresentation } from './member-accordian.presentation';

describe('MemberAccordianPresentation', () => {
  let component: MemberAccordianPresentation;
  let fixture: ComponentFixture<MemberAccordianPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberAccordianPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberAccordianPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
