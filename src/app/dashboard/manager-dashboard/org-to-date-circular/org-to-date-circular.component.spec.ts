import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgToDateCircularComponent } from './org-to-date-circular.component';

describe('OrgToDateCircularComponent', () => {
  let component: OrgToDateCircularComponent;
  let fixture: ComponentFixture<OrgToDateCircularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgToDateCircularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgToDateCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
