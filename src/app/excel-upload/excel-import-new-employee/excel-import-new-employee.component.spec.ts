import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelImportNewEmployeeComponent } from './excel-import-new-employee.component';

describe('ExcelImportNewEmployeeComponent', () => {
  let component: ExcelImportNewEmployeeComponent;
  let fixture: ComponentFixture<ExcelImportNewEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelImportNewEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelImportNewEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
