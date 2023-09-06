import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRequestTableComponent } from './my-request-table.component';

describe('MyRequestTableComponent', () => {
  let component: MyRequestTableComponent;
  let fixture: ComponentFixture<MyRequestTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRequestTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
