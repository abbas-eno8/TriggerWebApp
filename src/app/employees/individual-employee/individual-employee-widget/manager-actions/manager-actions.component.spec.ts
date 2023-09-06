import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerActionsComponent } from './manager-actions.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ManagerActionsComponent', () => {
  let component: ManagerActionsComponent;
  let fixture: ComponentFixture<ManagerActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerActionsComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should be create ngOnInit()', () => {
      expect(component.ngOnInit).toBeTruthy();
    });

    it('should be check ngOnInit() work properly', () => {
      component.ngOnInit();
    });
  });
});
