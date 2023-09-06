import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DesktopViewPresentation } from './desktop-view.presentation';

describe('DesktopViewPresentation', () => {
  let component: DesktopViewPresentation;
  let fixture: ComponentFixture<DesktopViewPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesktopViewPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopViewPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
