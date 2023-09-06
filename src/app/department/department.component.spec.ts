/**
@author : Sonal Patil
@class : DepartmentComponent
@description :DepartmentComponent is created for unit test cases.
**/
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DepartmentComponent } from './department.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToasterService, Toast } from 'angular2-toaster';
import { DepartmentService } from './department.service/department.service';
import { LoaderService } from '../core/loader/loader.service';
import { AuthService } from '../core/auth/auth.service';
import { SearchPipePipe } from '../shared/pipes/search-pipe.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';
import { SharedModule } from '../shared/shared.module';
import { Session } from 'protractor';
import { GlobalResponseHandlerService } from '../core/global-response-handler/global-response-handler';
import { DepartmentModel } from './department.model';
import { MatDialog } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CustomValidation } from '../shared/Validation/custom.validation';
import { mockUserData } from '../core/mock-data/mock-userdata';
import { of } from 'rxjs';
declare var $: any;
describe('DepartmentComponent', () => {
  let component: DepartmentComponent;
  let fixture: ComponentFixture<DepartmentComponent>;
  let DEPARTMENT;
  let RESPONSE;
  let mockPipeSpy;
  let mockDepartmentService, mocktoasterService, mockloaderService, mockbsModalService, mockAuthService, mockGlobalResponseHandlerService, mockMatDialog, customValidation;
  let mockActivatedRoute;
  beforeEach(async(() => {
    DEPARTMENT = {
      "message": "Ok",
      "status": 200,
      "data": [
        {
          "Id": 1,
          "companyId": 1,
          "departmentId": 1,
          "department": "Human Resources",
          "isActive": false,
          "createdBy": 0,
          "updatedBy": null,
          "result": 0
        },
        {
          "Id": 2,
          "companyId": 0,
          "departmentId": 6,
          "department": "QA",
          "isActive": false,
          "createdBy": 0,
          "updatedBy": null,
          "result": 0
        }
      ]
    };
    const RESPONSE =
    {
      "message": "New Department Added successfully",
      "status": 200,
      "data": [
        {}
      ]
    }

    mockPipeSpy = spyOn(SearchPipePipe.prototype, 'transform');
    mockDepartmentService = jasmine.createSpyObj(['getDepartment', 'addDepartment']);
    //mocktoasterService = jasmine.createSpyObj(['pop']);
    mockloaderService = jasmine.createSpyObj(['emitIsLoaderShown']);
    mockActivatedRoute = {
      snapshot: { snapshot: { params: { 'employeeId': '1' } } }
    };
    mockGlobalResponseHandlerService = jasmine.createSpyObj(['getApiResponse', 'isSideBar', 'encriptData', 'getUserData']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, SharedModule],
      declarations: [DepartmentComponent],
      providers: [
        { provide: DepartmentService, useValue: mockDepartmentService },
        //{ provide: ToasterService, useValue: mocktoasterService },
        { provide: LoaderService, useValue: mockloaderService },
        //{ provide: AuthService, useValue: mockAuthService },
        //{ provide: ActivatedRoute, useValue: mockActivatedRoute },
        //{ provide: SearchPipePipe, useValue: mockPipeSpy },
        { provide: GlobalResponseHandlerService, useValue: mockGlobalResponseHandlerService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: CustomValidation, useValue: customValidation },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(DepartmentComponent);
    mockDepartmentService = TestBed.get(DepartmentService);
    mockDepartmentService.getDepartment.and.returnValue(of(DEPARTMENT));
    //fixture.componentInstance.department = "HELP";
    mockGlobalResponseHandlerService.displayLoader.and.returnValue(true);
    component = new DepartmentComponent();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // describe('ngOnInit', () => {

  //   it('should be create ngOnInit()', () => {
  //     expect(component.ngOnInit).toBeTruthy();
  //   });

  //   it('should check ngOnInit working properly', () => {
  //     mockGlobalResponseHandlerService.getUserData.and.returnValue(mockUserData)
  //     spyOn(component, 'getDepartment');
  //     component.ngOnInit();
  //     expect(component.getDepartment).toHaveBeenCalled();
  //   });

  // });

  // describe('getDepartments', () => {

  //   it('should create ngOnInit', () => {
  //     expect(fixture.componentInstance.ngOnInit).toBeTruthy();
  //   });

  //   it('should create getDepartments', () => {
  //     expect(fixture.componentInstance.getDepartment).toBeTruthy();
  //   });

  //   it('should check emitIsLoaderShown function', () => {
  //     mockloaderService.emitIsLoaderShown.and.returnValue(true);
  //   });

  //   it('should be get departments currently from the service successfully ', () => {
  //     mockGlobalResponseHandlerService.getApiResponse.and.returnValue(true);
  //     fixture.detectChanges();
  //     expect(fixture.componentInstance.filteredDepartments.length).toBe(2);
  //   });

  //   it('should be get departments currently from the service failed ', () => {
  //     mockGlobalResponseHandlerService.getApiResponse.and.returnValue(false);
  //     fixture.detectChanges();
  //     expect(fixture.componentInstance.filteredDepartments.length).toBe(0);
  //   });

  //   it('should be check filter department works properly or not ', () => {
  //     mockGlobalResponseHandlerService.getApiResponse.and.returnValue(true);
  //     fixture.detectChanges();
  //     let mockFilterData = _.sortBy(DEPARTMENT.data, 'department');
  //     expect(fixture.componentInstance.filteredDepartments.length).toBe(mockFilterData.length);
  //   });

  //   it('should be get departments currently from the service successfully ', () => {
  //     mockGlobalResponseHandlerService.getApiResponse.and.returnValue(true);
  //     fixture.detectChanges();

  //     expect(fixture.componentInstance.filteredDepartments.length).toBe(2);
  //   });

  // });

  // describe('setToolTip', () => {

  //   it('should create setToolTip', () => {
  //     expect(component.setToolTip).toBeTruthy();
  //   });
  //   it('should be check setToolTip method work properly', () => {
  //     component.setToolTip();
  //     expect(component.tooltipHeader).toBe(DepartmentModel.TooltipHeader);
  //     expect(component.tooltipDescription).toBe(DepartmentModel.TooltipDescription);

  //   });
  // });

  // describe('addEditDept', () => {

  //   it('should create addEditDept method', () => {
  //     expect(fixture.componentInstance.addEditDept).toBeTruthy();
  //   });

  //   it('should create decline method', () => {
  //     expect(fixture.componentInstance.decline).toBeTruthy();
  //   });

  //   it('should be check departmentValidation truthy', () => {

  //     // mockDepartmentService.addDepartment.and.returnValue(Promise.resolve(RESPONSE));
  //     // mockGlobalResponseHandlerService.getApiResponse.and.returnValue(true);
  //     // const modalSpy = spyOn(fixture.componentInstance, 'decline').and.callThrough();
  //     fixture.componentInstance.modalBtn = "Add";
  //     // fixture.detectChanges();
  //     // expect(fixture.componentInstance.addEditDept()).toBeTruthy();

  //     // fixture.componentInstance.addEditDept();
  //     // mockDepartmentService.addDepartment.and.returnValue(of(RESPONSE));
  //     // fixture.detectChanges();
  //     // expect(mockDepartmentService.addDepartment).toHaveBeenCalled();
  //     // expect(fixture.componentInstance.addEditDept).toHaveBeenCalled();
  //   });

  // });

  // describe('departmentValidation', () => {

  //   it('should create departmentValidation method', () => {
  //     expect(fixture.componentInstance.departmentValidation).toBeTruthy();
  //   });

  //   it('should be check required field validation for department name truthy', () => {
  //     fixture.componentInstance.department = "HR";
  //     fixture.detectChanges();
  //     expect(fixture.componentInstance.departmentValidation(fixture.componentInstance.department)).toBeTruthy();
  //   });

  // });

});
