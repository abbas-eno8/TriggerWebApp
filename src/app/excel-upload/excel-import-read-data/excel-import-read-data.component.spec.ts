import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelImportReadDataComponent } from './excel-import-read-data.component';

describe('ExcelImportReadDataComponent', () => {
  let component: ExcelImportReadDataComponent;
  let fixture: ComponentFixture<ExcelImportReadDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelImportReadDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelImportReadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
