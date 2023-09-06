import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SparkListPresentation } from './spark-list.presentation';

describe('SparkListPresentation', () => {
  let component: SparkListPresentation;
  let fixture: ComponentFixture<SparkListPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparkListPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparkListPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
