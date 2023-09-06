import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SparkNotificationDeclinePresentation } from './spark-notification-decline.presentation';


describe('SparkNotificationDeclinePresentation', () => {
  let component: SparkNotificationDeclinePresentation;
  let fixture: ComponentFixture<SparkNotificationDeclinePresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparkNotificationDeclinePresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparkNotificationDeclinePresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
