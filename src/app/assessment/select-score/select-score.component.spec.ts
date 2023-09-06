import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectScoreComponent } from './select-score.component';

describe('SelectScoreComponent', () => {
  let component: SelectScoreComponent;
  let fixture: ComponentFixture<SelectScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
