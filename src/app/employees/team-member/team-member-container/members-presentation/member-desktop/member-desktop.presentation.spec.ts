import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberDesktopPresentation } from './member-desktop.presentation';

describe('MemberDesktopComponent', () => {
  let component: MemberDesktopPresentation;
  let fixture: ComponentFixture<MemberDesktopPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDesktopPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDesktopPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
