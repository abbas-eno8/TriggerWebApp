import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfSelectionComponent } from './pdf-selection.component';

describe('PdfSelectionComponent', () => {
  let component: PdfSelectionComponent;
  let fixture: ComponentFixture<PdfSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
