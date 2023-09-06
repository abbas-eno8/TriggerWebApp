import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualRatingCompletedComponent } from './actual-rating-completed.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ActualRatingCompletedComponent', () => {
  let component: ActualRatingCompletedComponent;
  let fixture: ComponentFixture<ActualRatingCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualRatingCompletedComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualRatingCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should be create ngOnInit()', () => {
      expect(component.ngOnInit).toBeTruthy();
    });

    it('should be check ngOnInit() work properly', () => {
      component.ngOnInit();
    });
  });
});
