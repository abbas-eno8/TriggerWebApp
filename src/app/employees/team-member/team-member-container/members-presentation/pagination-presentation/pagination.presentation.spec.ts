import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationPresentation } from './pagination.presentation';

describe('PaginationPresentation', () => {
  let component: PaginationPresentation;
  let fixture: ComponentFixture<PaginationPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
