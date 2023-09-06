import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamWidgetComponent } from './team-widget.component';

describe('TeamWidgetComponent', () => {
  let component: TeamWidgetComponent;
  let fixture: ComponentFixture<TeamWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
