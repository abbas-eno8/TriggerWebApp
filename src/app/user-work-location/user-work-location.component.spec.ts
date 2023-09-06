import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkLocationComponent } from './user-work-location.component';

describe('UserWorkLocationComponent', () => {
  let component: UserWorkLocationComponent;
  let fixture: ComponentFixture<UserWorkLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWorkLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWorkLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
