import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLocationPopupComponent } from './work-location-popup.component';

describe('WorkLocationPopupComponent', () => {
  let component: WorkLocationPopupComponent;
  let fixture: ComponentFixture<WorkLocationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkLocationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkLocationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
