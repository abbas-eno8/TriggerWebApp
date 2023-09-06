import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDashboardListComponent } from './my-dashboard-list.component';

describe('MyDashboardListComponent', () => {
  let component: MyDashboardListComponent;
  let fixture: ComponentFixture<MyDashboardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDashboardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDashboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
