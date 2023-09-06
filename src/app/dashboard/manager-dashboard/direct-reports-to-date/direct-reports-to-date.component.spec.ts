import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectReportsToDateComponent } from './direct-reports-to-date.component';

describe('DirectReportsToDateComponent', () => {
  let component: DirectReportsToDateComponent;
  let fixture: ComponentFixture<DirectReportsToDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectReportsToDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectReportsToDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
