import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildHeaderViewComponent } from './child-header-view.component';

describe('ChildHeaderViewComponent', () => {
  let component: ChildHeaderViewComponent;
  let fixture: ComponentFixture<ChildHeaderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildHeaderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildHeaderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
