import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModalComponent } from './content-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ModalContent } from './conten-modal-model';
import { Route } from '../../../core/magic-string/common.model';

describe('ContentModalComponent', () => {
  let component: ContentModalComponent;
  let fixture: ComponentFixture<ContentModalComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  let dialogData = {
    value: ModalContent.NoAccessContent,
    client: '1Rivet'
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContentModalComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: MAT_DIALOG_DATA, useValue: dialogData }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentModalComponent);
    component = fixture.componentInstance;
    expect(component.client).toBe('1Rivet');
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

  describe('setContent', () => {

    it('should be create setContent()', () => {
      expect(component.setContent).toBeTruthy();
    });

    it('should check ngOnInit working properly', () => {
      let contentValue = ModalContent.ExcelUploadNoDepartmentFoundContent;
      component.setContent(contentValue);
    });

  });

  describe('onClickOk', () => {

    it('should be create onClickOk()', () => {
      expect(component.onClickOk).toBeTruthy();
    });

    it('should check onClickOk working properly', () => {
      component.onClickOk();
      expect(router.navigate).toHaveBeenCalledWith([Route.Employee]);
    });
  });
});
