import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparkWidgetComponent } from './spark-widget.component';

describe('SparkWidgetComponent', () => {
  let component: SparkWidgetComponent;
  let fixture: ComponentFixture<SparkWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparkWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparkWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
