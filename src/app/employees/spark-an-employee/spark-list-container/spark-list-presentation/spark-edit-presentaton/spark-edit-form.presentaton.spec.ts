import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SparkEditFormPresentaton } from './spark-edit-form.presentaton';

describe('SparkFormPresentaton', () => {
  let component: SparkEditFormPresentaton;
  let fixture: ComponentFixture<SparkEditFormPresentaton>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparkEditFormPresentaton ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparkEditFormPresentaton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
