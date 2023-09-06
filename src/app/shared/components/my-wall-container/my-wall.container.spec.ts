import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWallContainer } from './my-wall.container';

describe('UserWallContainer', () => {
  let component: MyWallContainer;
  let fixture: ComponentFixture<MyWallContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWallContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWallContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
