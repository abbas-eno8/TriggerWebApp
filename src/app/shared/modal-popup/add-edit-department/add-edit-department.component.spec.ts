import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDepartmentComponent } from './add-edit-department.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { CustomValidation } from '../../Validation/custom.validation';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { DepartmentService } from '../../../department/department.service/department.service';
import { LoaderService } from '../../../core/loader/loader.service';

describe('AddEditDepartmentComponent', () => {
  let component: AddEditDepartmentComponent;
  let fixture: ComponentFixture<AddEditDepartmentComponent>;
  let dialogData = {
    clientId: 691,
    buttonValue: "Update",
    modalTitle: "Edit department",
    departmentName: "Human Resources",
    departmentId: 5,
    sendTrigger: true,
    sendSpark: true
  }
  const RESPONSE =
    {
      "message": "New Department Added successfully",
      "status": 200,
      "data": [
        {}
      ]
    }
  let matDialogRef, mockGlobalResponseHandlerService, mockToasterService, mockCustomValidation, mockDepartmentService, mockLoaderService;
  mockDepartmentService = jasmine.createSpyObj(['addDepartment', 'updateDepartment']);
  mockCustomValidation = jasmine.createSpyObj(['AlphabaticharOnly', 'pasteOnlyAlphabaticEvent', 'IgnoreSpace']);
  mockToasterService = jasmine.createSpyObj(['pop']);
  mockLoaderService = jasmine.createSpyObj(['emitIsLoaderShown'])
  mockGlobalResponseHandlerService = jasmine.createSpyObj(['getApiResponse']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditDepartmentComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        { provide: ToasterService, useValue: mockToasterService },
        { provide: CustomValidation, useValue: mockCustomValidation },
        { provide: GlobalResponseHandlerService, useValue: mockGlobalResponseHandlerService },
        { provide: DepartmentService, useValue: mockDepartmentService },
        { provide: LoaderService, useValue: mockLoaderService },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDepartmentComponent);
    component = fixture.componentInstance;
    component.department = dialogData;
    mockLoaderService.emitIsLoaderShown.and.returnValue(true);
    expect(component.department).toBe(dialogData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should be create ngOnInit()', () => {
      expect(component.ngOnInit).toBeTruthy();
    });
  });

  describe('onClickAdd', () => {

    it('should be create onClickAdd()', () => {
      expect(component.onClickAdd).toBeTruthy();
    });

    it('should check onClickAdd working properly', () => {
      spyOn(component, 'departmentValidation');
      spyOn(component, 'addDepartment');
      component.data.departmentId = 0;
      component.onClickAdd();
      component.departmentValidation(component.data.departmentName);
      expect(component.departmentValidation).toHaveBeenCalledWith(component.data.departmentName);

      expect(component.data.departmentId).toBe(0);
      component.addDepartment();
    });
  });

  describe('departmentValidation', () => {

    it('should be create departmentValidation()', () => {
      expect(component.departmentValidation).toBeTruthy();
    });

    it('should check departmentValidation working properly', () => {
      spyOn(component, 'departmentValidation');
      component.departmentValidation(component.data.departmentName);
      expect(component.departmentValidation).toHaveBeenCalledWith(component.data.departmentName);
    });
  });

  describe('AlphabaticharOnly', () => {

    it('should be create AlphabaticharOnly()', () => {
      expect(component.AlphabaticharOnly).toBeTruthy();
    });

    it('should check AlphabaticharOnly method working properly', () => {
      component.AlphabaticharOnly(event);
      expect(mockCustomValidation.AlphabaticharOnly).toHaveBeenCalledWith(event);
    });
  });

  describe('pasteOnlyAlphabaticEvent', () => {

    it('should be create pasteOnlyAlphabaticEvent()', () => {
      expect(component.pasteOnlyAlphabaticEvent).toBeTruthy();
    });

    it('should check pasteOnlyAlphabaticEvent method working properly', () => {
      component.pasteOnlyAlphabaticEvent(event);
      expect(mockCustomValidation.pasteOnlyAlphabaticEvent).toHaveBeenCalledWith(event);
      expect(mockCustomValidation.IgnoreSpace).toHaveBeenCalledWith(event);
    });
  });

  describe('addDepartment', () => {

    it('should be create addDepartment()', () => {
      expect(component.addDepartment).toBeTruthy();
    });

    it('should check addDepartment working properly', () => {
      // mockDepartmentService.addDepartment.and.returnValue(of(RESPONSE));
      // mockGlobalResponseHandlerService.getApiResponse.and.returnValue(true);
      // component.addDepartment();
      // expect(mockDepartmentService.addDepartment).toHaveBeenCalledWith(this.data.departmentName);


      //matDialogRef.close();
      //spyOn(matDialogRef, 'close').and.callThrough();
      //component.dialogRef.close()
      //expect(component.dialogRef.close()).toHaveBeenCalledWith('Add department');
      //expect(fixture.componentInstance.addDepartment()).toBeTruthy();

      // mockDepartmentService.addDepartment.and.returnValue(Promise.resolve(RESPONSE));
      // //component.user = mockUserData;
      // component.getAllClient();
      // expect(component.filteredClients).toEqual(clientdata);
    });
  });

  describe('UpdateDepartment', () => {

    it('should be create UpdateDepartment()', () => {
      mockLoaderService.emitIsLoaderShown.and.returnValue(true);
      expect(component.UpdateDepartment).toBeTruthy();
    });
  });
});
