import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelMismatchComponent } from './excel-mismatch.component';

describe('ExcelMismatchComponent', () => {
  let component: ExcelMismatchComponent;
  let fixture: ComponentFixture<ExcelMismatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelMismatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelMismatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
