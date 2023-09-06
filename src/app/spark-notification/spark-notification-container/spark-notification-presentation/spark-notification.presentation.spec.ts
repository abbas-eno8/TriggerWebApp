import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparkNotificationPresentation } from './spark-notification.presentation';

describe('SparkNotificationPresentation', () => {
  let component: SparkNotificationPresentation;
  let fixture: ComponentFixture<SparkNotificationPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparkNotificationPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparkNotificationPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
