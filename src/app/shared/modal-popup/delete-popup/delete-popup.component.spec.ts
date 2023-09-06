import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePopupComponent } from './delete-popup.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

describe('DeletePopupComponent', () => {
  let component: DeletePopupComponent;
  let fixture: ComponentFixture<DeletePopupComponent>;
  let data = 'Delete';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeletePopupComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    TestBed.configureTestingModule({
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePopupComponent);
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
  });

  describe("should test output emitter with subscriber", () => {

    it('should test the confirm emitter with a simple subscribe', async(() => {
      component.confirm.subscribe(event => {
        expect(event)
      });
    }));
  })

  describe("onClickYes()", () => {

    it('should be create onClickYes()', () => {
      expect(component.onClickYes).toBeTruthy();
    });

    it('should be check onClickYes() work properly', async(() => {
      spyOn(component.confirm, 'emit');
      component.onClickYes();
      expect(component.confirm.emit).toHaveBeenCalledWith(true);
    }));
  })
});
