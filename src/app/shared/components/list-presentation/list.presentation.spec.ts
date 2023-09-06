import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPresentation } from './list.presentation';

describe('ListPresentation', () => {
  let component: ListPresentation;
  let fixture: ComponentFixture<ListPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
