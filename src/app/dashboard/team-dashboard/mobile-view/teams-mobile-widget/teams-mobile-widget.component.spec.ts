import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsMobileWidgetComponent } from './teams-mobile-widget.component';

describe('TeamsMobileWidgetComponent', () => {
  let component: TeamsMobileWidgetComponent;
  let fixture: ComponentFixture<TeamsMobileWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsMobileWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsMobileWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
