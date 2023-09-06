import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDirectWorkLocationHistoryComponent } from './my-direct-work-location-history.component';

describe('MyDirectWorkLocationHistoryComponent', () => {
  let component: MyDirectWorkLocationHistoryComponent;
  let fixture: ComponentFixture<MyDirectWorkLocationHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDirectWorkLocationHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDirectWorkLocationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
