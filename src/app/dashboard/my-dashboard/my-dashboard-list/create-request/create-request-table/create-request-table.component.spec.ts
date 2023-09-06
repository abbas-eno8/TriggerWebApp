import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRequestTableComponent } from './create-request-table.component';

describe('CreateRequestTableComponent', () => {
  let component: CreateRequestTableComponent;
  let fixture: ComponentFixture<CreateRequestTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRequestTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
