import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveyPaginationPresentation } from './pagination.presentation';

describe('PaginationPresentation', () => {
  let component: SurveyPaginationPresentation;
  let fixture: ComponentFixture<SurveyPaginationPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPaginationPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPaginationPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
