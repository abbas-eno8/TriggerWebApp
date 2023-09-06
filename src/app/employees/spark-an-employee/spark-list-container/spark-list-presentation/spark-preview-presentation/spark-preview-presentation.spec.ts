import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SparkPreviewPresentation } from './spark-preview-presentation';

describe('SparkPreviewPresentation', () => {
  let component: SparkPreviewPresentation;
  let fixture: ComponentFixture<SparkPreviewPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparkPreviewPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparkPreviewPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
