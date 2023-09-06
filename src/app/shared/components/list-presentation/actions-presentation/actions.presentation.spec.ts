import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionsPresentation } from './actions.presentation';

describe('ActionsPresentation', () => {
  let component: ActionsPresentation;
  let fixture: ComponentFixture<ActionsPresentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsPresentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
