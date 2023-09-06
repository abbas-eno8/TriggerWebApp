import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectReportsToDateProgressiveComponent } from './direct-reports-to-date-progressive.component';

describe('DirectReportsToDateProgressiveComponent', () => {
  let component: DirectReportsToDateProgressiveComponent;
  let fixture: ComponentFixture<DirectReportsToDateProgressiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectReportsToDateProgressiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectReportsToDateProgressiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
