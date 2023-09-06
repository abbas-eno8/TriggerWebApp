import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDashboardWidgetComponent } from './my-dashboard-widget.component';

describe('MyDashboardWidgetComponent', () => {
  let component: MyDashboardWidgetComponent;
  let fixture: ComponentFixture<MyDashboardWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDashboardWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDashboardWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
