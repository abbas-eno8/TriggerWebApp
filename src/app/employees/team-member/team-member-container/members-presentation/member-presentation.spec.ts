import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberPresentation } from './member-presentation';

describe('MemberPresentation', () => {
  let component: MemberPresentation;
  let fixture: ComponentFixture<MemberPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
