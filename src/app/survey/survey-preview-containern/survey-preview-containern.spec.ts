import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SurveyPreviewContainer } from './survey-preview-containern';

describe('SurveyPreviewContainer', () => {
  let component: SurveyPreviewContainer;
  let fixture: ComponentFixture<SurveyPreviewContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPreviewContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPreviewContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
