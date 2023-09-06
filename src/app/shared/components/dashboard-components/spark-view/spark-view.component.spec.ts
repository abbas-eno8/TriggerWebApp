import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparkViewComponent } from './spark-view.component';

describe('SparkViewComponent', () => {
  let component: SparkViewComponent;
  let fixture: ComponentFixture<SparkViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparkViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparkViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
