/**
@author : Sonal Patil
@class : AdminComponent
@description :AdminComponent is created for unit test cases.
**/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../core/loader/loader.service';
import { CustomValidation } from '../shared/Validation/custom.validation';
import { GlobalResponseHandlerService } from '../core/global-response-handler/global-response-handler';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { mockUserData } from '../core/mock-data/mock-userdata';
import { CLIENTS } from '../core/mock-data/mock-clients';
import { ADMINS } from '../core/mock-data/mock-admins';
import { UrlEncryptionDecryptionService } from '../core/url-encryption-decryption/url-encryption-decryption.service';
import { Route } from '../core/magic-string/common.model';
import { ClientService } from '../clients/client-service/client.service';
import { EmployeeService } from '../core/services/employee-service/employee.service';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let mockEmployeeService, mockLoaderService, mockBsModalService, mockCustomValidation, mockClientService, mockGlobalResponseHandlerService;
  let mockUndescore, mockurlEncryptionDecryptionService;
  let mockbsModalRef;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
   
    mockurlEncryptionDecryptionService = jasmine.createSpyObj(['urlEncryption']);
    mockClientService = jasmine.createSpyObj(['getAllClient']);
    mockGlobalResponseHandlerService = jasmine.createSpyObj(['getUserData', 'getApiResponse']);
    mockEmployeeService = jasmine.createSpyObj(['getAllAdmins']);
    mockLoaderService = jasmine.createSpyObj(['emitIsLoaderShown']);
    mockUndescore = jasmine.createSpyObj(['sortBy']);
    mockbsModalRef = jasmine.createSpyObj(['hide']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, SharedModule],
      declarations: [AdminComponent],
      providers: [ 
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: LoaderService, useValue: mockLoaderService },
        { provide: CustomValidation, useValue: mockCustomValidation },
        { provide: ClientService, useValue: mockClientService },
        { provide: GlobalResponseHandlerService, useValue: mockGlobalResponseHandlerService },
        { provide: UrlEncryptionDecryptionService, useValue: mockurlEncryptionDecryptionService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    mockGlobalResponseHandlerService.getUserData.and.returnValue(mockUserData);
    mockGlobalResponseHandlerService.getApiResponse.and.returnValue(true);

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should be create ngOnInit()', () => {
      expect(component.ngOnInit).toBeTruthy();
    });

    // it('should be check ngOnInit() work properly', () => {
    //   spyOn(component, 'GetUser');
    //   component.ngOnInit();
    //   expect(component.GetUser).toHaveBeenCalled();
    // });
  });

  // describe('Get User Data', () => {

  //   it('should be create GetUser()', () => {
  //     expect(component.GetUser).toBeTruthy();
  //   });

  //   it('should be check UserData , clientId , UserID & userRole', () => {
  //     spyOn(component, 'getAllClient');
  //     component.GetUser();
  //     expect(component.user).toBe(mockUserData);
  //     // expect(component.userRole).toBe(mockUserData.userRole);
  //     expect(component.getAllClient).toHaveBeenCalled();
  //   });
  // });

  // describe('resetData', () => {

  //   it('should create resetData', () => {
  //     expect(component.resetData).toBeTruthy();
  //   });
  //   it('should be check resetData method work properly', () => {
  //     spyOn(component, 'getAdmin');
  //     component.user = mockUserData;
  //     component.resetData();
  //     expect(component.getAdmin).toHaveBeenCalledWith(component.user.clientId);
  //   });

  // });

  // describe('getAllClient', () => {

  //   it('should create getAllClient', () => {
  //     expect(component.getAllClient).toBeTruthy();
  //   });
  //   it('should be check getAllClient method work properly', () => {
  //     mockClientService.getAllClient.and.returnValue(of(CLIENTS));
  //     spyOn(component, 'getAdmin');
  //     component.user = mockUserData;
  //     let clientdata: any = _.sortBy(CLIENTS.data, 'companyName');
  //     component.getAllClient();
  //     expect(component.clientData).toEqual(clientdata);
  //     expect(component.getAdmin).toHaveBeenCalledWith(component.user.clientId)
  //   });

  // });

  // describe('changeDepartment', () => {

  //   it('should create changeDepartment', () => {
  //     expect(component.changeDepartment).toBeTruthy();
  //   });
  //   it('should be check changeDepartment method work properly', () => {
  //     spyOn(component, 'search');
  //     component.searchText = 'sonal';
  //     component.changeDepartment(1);
  //     expect(component.selectedClient).toBe(1);
  //     expect(component.search).toHaveBeenCalledWith('sonal');
  //   });

  // });

  // describe('searchEnter', () => {

  //   it('should create searchEnter', () => {
  //     expect(component.searchEnter).toBeTruthy();
  //   });
  // });

  // describe('search', () => {

  //   it('should create search', () => {
  //     expect(component.search).toBeTruthy();
  //   });
  //   // it('should be check search method work properly', () => {
  //   //   spyOn(component, 'searchEmployee');
  //   //   spyOn(component, 'getAdmin');
  //   //   component.user = mockUserData;
  //   //   component.search('Sonal');
  //   //   expect(component.searchEmployee).toHaveBeenCalledWith('Sonal');
  //   //   expect(component.getAdmin).toHaveBeenCalledWith(component.user.clientId);
  //   // });

  // });

  // describe('searchEmployee', () => {

  //   it('should create searchEmployee', () => {
  //     expect(component.searchEmployee).toBeTruthy();
  //   });
  //   it('should be check searchEmployee method work properly', () => {
  //     component.searchEmployee('Sonal');
  //     expect(component._searchText).toBe('Sonal');
  //     expect(component._searchText).not.toBe(null);
  //     expect(component._searchText).not.toBe(undefined);
  //     expect(component._searchText).not.toBe("");
  //   });

  // });

  // describe('goToAddEmployee', () => {

  //   it('should create goToAddEmployee', () => {
  //     expect(component.goToAddEmployee).toBeTruthy();
  //   });
  //   it('should be check goToAddEmployee method work properly', () => {
  //     component.goToAddEmployee(1);
  //     expect(mockurlEncryptionDecryptionService.urlEncryption).toHaveBeenCalledWith('1', Route.AddAdmin);
  //   });

  // });

  describe('getAdmin', () => {

    // it('should create getAdmin', () => {
    //   expect(component.getAdmin).toBeTruthy();
    // });
    // it('should be check getAdmin method work properly', () => {
    //   //spyOn(component, 'isDisplayRecordsNotFoundPage');
    //   mockEmployeeService.getAllAdmins.and.returnValue(of(ADMINS));
    //   //expect(component.isDisplayRecordsNotFound).toHaveBeenCalledWith(ADMINS);
    //   let filterData: any = _.sortBy(ADMINS.data, 'companyName');
    //   component.user = mockUserData;
    //   component.getAdmin(component.user.clientId);
    //   expect(component.filteredData).toEqual(filterData);
    // });

  });

  // describe('sort', () => {

  //   it('should create sort', () => {
  //     expect(component.sort).toBeTruthy();
  //   });
  //   it('should be check sort method work properly for ascending order', () => {
  //     component.filteredData = ADMINS.data;
  //     let filteredData: any = _.sortBy(component.filteredData, 'firstName');
  //     component.sort('firstName');
  //     expect(component.filteredData.length).toEqual(filteredData.length);
  //   });

  //   it('should be check sort method work properly for descending order', () => {
  //     component.filteredData = ADMINS.data;
  //     component.direction = 1;
  //     let filteredData: any = _.sortBy(component.filteredData, 'firstName');
  //     filteredData = filteredData.reverse();
  //     component.sort('firstName');
  //     expect(component.filteredData.length).toEqual(filteredData.length);

  //   });

  // });
});


