import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForSparkTriggerComponent } from './request-for-spark-trigger.component';

describe('RequestForSparkTriggerComponent', () => {
  let component: RequestForSparkTriggerComponent;
  let fixture: ComponentFixture<RequestForSparkTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestForSparkTriggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestForSparkTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
