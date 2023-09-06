import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWallPresentation } from './my-wall.presentation';

describe('UserWallPresentation', () => {
  let component: MyWallPresentation;
  let fixture: ComponentFixture<MyWallPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWallPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWallPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
