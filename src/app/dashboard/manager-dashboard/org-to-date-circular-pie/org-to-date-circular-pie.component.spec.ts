import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgToDateCircularPieComponent } from './org-to-date-circular-pie.component';

describe('OrgToDateCircularPieComponent', () => {
  let component: OrgToDateCircularPieComponent;
  let fixture: ComponentFixture<OrgToDateCircularPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgToDateCircularPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgToDateCircularPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
