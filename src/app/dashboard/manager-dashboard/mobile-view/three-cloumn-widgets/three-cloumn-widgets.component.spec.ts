import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeCloumnWidgetsComponent } from './three-cloumn-widgets.component';

describe('ThreeCloumnWidgetsComponent', () => {
  let component: ThreeCloumnWidgetsComponent;
  let fixture: ComponentFixture<ThreeCloumnWidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeCloumnWidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeCloumnWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
