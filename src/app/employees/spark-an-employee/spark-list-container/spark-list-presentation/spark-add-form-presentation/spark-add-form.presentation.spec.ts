import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SparkAddFormPresentation } from './spark-add-form.presentation';

describe('SparkAddFormPresentation', () => {
  let component: SparkAddFormPresentation;
  let fixture: ComponentFixture<SparkAddFormPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparkAddFormPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparkAddFormPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
