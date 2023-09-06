import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectReportsToDateProgressivePieComponent } from './direct-reports-to-date-progressive-pie.component';

describe('DirectReportsToDateProgressivePieComponent', () => {
  let component: DirectReportsToDateProgressivePieComponent;
  let fixture: ComponentFixture<DirectReportsToDateProgressivePieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectReportsToDateProgressivePieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectReportsToDateProgressivePieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
