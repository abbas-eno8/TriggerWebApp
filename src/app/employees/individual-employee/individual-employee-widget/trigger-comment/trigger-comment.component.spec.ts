import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerCommentComponent } from './trigger-comment.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchPipePipe } from '../../../../shared/pipes/search-pipe.pipe';

describe('TriggerCommentComponent', () => {
  let component: TriggerCommentComponent;
  let fixture: ComponentFixture<TriggerCommentComponent>;
  let mockSearchPipePipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TriggerCommentComponent],
      providers: [
        { provide: SearchPipePipe, useValue: mockSearchPipePipe },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
