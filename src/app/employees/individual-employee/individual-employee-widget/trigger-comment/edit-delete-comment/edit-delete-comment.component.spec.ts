import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommentComponent } from './edit-delete-comment.component';

describe('EditDeleteCommentComponent', () => {
  let component: EditCommentComponent;
  let fixture: ComponentFixture<EditCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
