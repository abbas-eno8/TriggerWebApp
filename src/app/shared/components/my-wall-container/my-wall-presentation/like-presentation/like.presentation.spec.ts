import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikePresentation } from './like.presentation';

describe('LikePresentation', () => {
  let component: LikePresentation;
  let fixture: ComponentFixture<LikePresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikePresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikePresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
