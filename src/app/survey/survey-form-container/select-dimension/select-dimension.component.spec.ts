import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDimensionComponent } from './select-dimension.component';

describe('SelectDimensionComponent', () => {
  let component: SelectDimensionComponent;
  let fixture: ComponentFixture<SelectDimensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDimensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDimensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
