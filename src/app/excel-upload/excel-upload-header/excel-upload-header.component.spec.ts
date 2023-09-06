import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelUploadHeaderComponent } from './excel-upload-header.component';

describe('ExcelUploadHeaderComponent', () => {
  let component: ExcelUploadHeaderComponent;
  let fixture: ComponentFixture<ExcelUploadHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelUploadHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelUploadHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
