import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SparkDesktopPresentation } from './spark-desktop.presentation';
describe('SparkDesktopPresentation', () => {
  let component: SparkDesktopPresentation;
  let fixture: ComponentFixture<SparkDesktopPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparkDesktopPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparkDesktopPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
