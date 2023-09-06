import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgToDateComponent } from './org-to-date.component';

describe('OrgToDateComponent', () => {
  let component: OrgToDateComponent;
  let fixture: ComponentFixture<OrgToDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgToDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgToDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
