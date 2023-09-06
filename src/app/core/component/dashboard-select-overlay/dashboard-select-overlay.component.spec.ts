import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSelectOverlayComponent } from './dashboard-select-overlay.component';

describe('DashboardSelectOverlayComponent', () => {
  let component: DashboardSelectOverlayComponent;
  let fixture: ComponentFixture<DashboardSelectOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSelectOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSelectOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
