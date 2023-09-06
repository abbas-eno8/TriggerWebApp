import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionTooltip } from './reaction-tooltip';

describe('CommentPresentation', () => {
  let component: ReactionTooltip;
  let fixture: ComponentFixture<ReactionTooltip>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionTooltip ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionTooltip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
