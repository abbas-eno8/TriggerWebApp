import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SparkReplyPresentation } from './spark-reply-presentation';

describe('SparkReplyPresentation', () => {
  let component: SparkReplyPresentation;
  let fixture: ComponentFixture<SparkReplyPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SparkReplyPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SparkReplyPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
