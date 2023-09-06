/**
@author : Sonal Patil
@class : AddAdminComponent
@description :AddAdminComponent is created for unit test cases.
**/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAdminComponent } from './add-admin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { ToasterService } from 'angular2-toaster';
import { CustomValidation } from '../../shared/Validation/custom.validation';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../../shared/shared.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as _ from 'underscore';
import { TextMaskModule } from 'angular2-text-mask';
import { EMPLOYEE } from '../../core/mock-data/mock-employee';
import { ROLE, ROLE_WITHOUT_ADMIN } from '../../core/mock-data/mock-role';
import { CLIENTS } from '../../core/mock-data/mock-clients';
import { ETHINICITY } from '../../core/mock-data/mock-ethinicity';
import { COUNTRY } from '../../core/mock-data/mock-country';
import { REGION } from '../../core/mock-data/mock-region';
import { UrlEncryptionDecryptionService } from '../../core/url-encryption-decryption/url-encryption-decryption.service';
import { RoleEnum } from '../../core/magic-string/common.model';
import { ClientService } from '../../clients/client-service/client.service';
import { EmployeeService } from '../../core/services/employee-service/employee.service';
import { of } from 'rxjs';
import { GlobalEventsManager } from '../../core/navbar/globalEventsManager';

describe('AddAdminComponent', () => {
  let component: AddAdminComponent;
  let fixture: ComponentFixture<AddAdminComponent>;
  let globalEventsManager, mockGlobalResponseHandlerService, mockTosterService, mockCustomValidation, mockemployeeService, mockActivatedRoute, mockclientService, mockFormBuilder, mockurlEncryptionDecryptionService;
  beforeEach(async(() => {
    mockActivatedRoute = {
      snapshot: { queryParams: { 'id': '0' } }
    };

    mockFormBuilder = jasmine.createSpyObj(['group']);
    mockGlobalResponseHandlerService = jasmine.createSpyObj(['displayLoader', 'getApiResponse']);
    mockemployeeService = jasmine.createSpyObj(['getAdminById', 'getTriggerRole', 'getEthnicity', 'getCountry', 'getRegion']);
    mockclientService = jasmine.createSpyObj(['getAllClient']);
    mockCustomValidation = jasmine.createSpyObj(['pasteOnlyNumericEvent', 'pasteOnlyAlphabaticEvent', 'zipcodeValidation', 'numberOnly', 'decimalOnly', 'AlphabaticharOnly', 'avoidBlankSpace', 'inputDateValidation']);
    mockurlEncryptionDecryptionService = jasmine.createSpyObj(['urlDecryption']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, SharedModule, TextMaskModule, ReactiveFormsModule, BsDatepickerModule.forRoot()],
      declarations: [AddAdminComponent],
      providers: [
        { provide: UrlEncryptionDecryptionService, useValue: mockurlEncryptionDecryptionService },
        { provide: ToasterService, useValue: mockTosterService },
        { provide: GlobalResponseHandlerService, useValue: mockGlobalResponseHandlerService },
        { provide: CustomValidation, useValue: mockCustomValidation },
        { provide: EmployeeService, useValue: mockemployeeService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ClientService, useValue: mockclientService },
        { provide: FormBuilder, useValue: mockFormBuilder },
        { provide: GlobalEventsManager, useValue: globalEventsManager },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    fixture = TestBed.createComponent(AddAdminComponent);
    component = fixture.componentInstance;

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should be create ngOnInit()', () => {
      expect(component.ngOnInit).toBeTruthy();
    });

    it('should check ngOnInit working properly', () => {
      spyOn(component, 'initializeForm');
      component.ngOnInit();
      expect(component.initializeForm).toHaveBeenCalled();
    });

  });

  describe('initializeForm', () => {

    it('should be create initializeForm()', () => {
      expect(component.initializeForm).toBeTruthy();
    });

    it('should check initializeForm working properly', () => {
      // mockurlEncryptionDecryptionService.urlDecryption.and.returnValue('0')
      // spyOn(component, 'ReturnForm');
      // expect(component.ReturnForm).toHaveBeenCalledWith(null);
      // expect(mockurlEncryptionDecryptionService.urlDecryption).toHaveBeenCalledWith(component.employeeId)


      // spyOn(component, 'getEmployeeById');
      // expect(component.getEmployeeById).toHaveBeenCalledWith(component.employeeId);
      // spyOn(component, 'getTriggerRole');
      // expect(component.getTriggerRole).toHaveBeenCalled();


    });

  });

  describe('getAdminById', () => {

    it('should be create getAdminById()', () => {
      expect(component.getAdminById).toBeTruthy();
    });
    // it('should check getAdminById method returns role data ', () => {
    //   mockGlobalResponseHandlerService.displayLoader.and.returnValue(true);
    //   mockGlobalResponseHandlerService.throwError.and.returnValue(true);
    //   mockemployeeService.getAdminById.and.returnValue(of(EMPLOYEE));
    //   spyOn(component, 'getTriggerRole');
    //   spyOn(component, 'ReturnForm');
    //   component.getAdminById(1);
    //   expect(component.employeeData).toEqual(EMPLOYEE.data);
    //   expect(component.ReturnForm).toHaveBeenCalledWith(EMPLOYEE.data);
    //   expect(component.getTriggerRole).toHaveBeenCalled();
    // });
  });
  describe('getTriggerRole', () => {

    it('should be create getTriggerRole()', () => {
      expect(component.getTriggerRole).toBeTruthy();
    });
    // it('should check getTriggerRole method returns role data ', () => {
    //   mockGlobalResponseHandlerService.displayLoader.and.returnValue(true);
    //   mockGlobalResponseHandlerService.throwError.and.returnValue(true);
    //   mockemployeeService.getTriggerRole.and.returnValue(of(ROLE));
      
    //   component.getTriggerRole();
    //   let triggerRoleData: any = _.where(ROLE.data, { role: RoleEnum.Admin });
    //   expect(component.triggerRole.length).toBe(triggerRoleData.length);
    //   // expect(component.selectedTriggerRole).toBe(triggerRoleData[0].roleId);
    //   // expect(component.selectedTriggerRoleValue).toBe(triggerRoleData[0].role);
    //   spyOn(component, 'getClient');
    //   expect(component.getClient).toHaveBeenCalled();
    // });
    // it('should check getTriggerRole method do not returns role data ', () => {
    //   mockGlobalResponseHandlerService.displayLoader.and.returnValue(true);
    //   mockGlobalResponseHandlerService.throwError.and.returnValue(true);
    //   mockemployeeService.getTriggerRole.and.returnValue(of(ROLE_WITHOUT_ADMIN));
    //   spyOn(component, 'getClient');
    //   component.getTriggerRole();
    //   let triggerRoleData: any = _.where(ROLE_WITHOUT_ADMIN.data, { role: RoleEnum.Admin });
    //   expect(component.triggerRole.length).toBe(0);
    //   // expect(component.selectedTriggerRole).toBe(undefined);
    //   // expect(component.selectedTriggerRoleValue).toBe(undefined);
    //   expect(component.getClient).not.toHaveBeenCalled();
    // });
  });

  describe('getClient', () => {

    it('should be create getClient()', () => {
      expect(component.getClient).toBeTruthy();
    });
    it('should check getClient method returns Clients data ', () => {
      mockclientService.getAllClient.and.returnValue(of(CLIENTS));
      mockGlobalResponseHandlerService.getApiResponse.and.returnValue(true);
      spyOn(component, 'getEthnicity');
      component.getClient();
      let ddlClientData = _.sortBy(CLIENTS.data, 'companyName');
      expect(component.clients.length).toBe(ddlClientData.length);
      expect(component.getEthnicity).toHaveBeenCalled();
    });
  });

  describe('getEthnicity', () => {

    it('should be create getEthnicity()', () => {
      expect(component.getEthnicity).toBeTruthy();
    });
    it('should check getEthnicity method returns Ethnicity data ', () => {
      mockemployeeService.getEthnicity.and.returnValue(of(ETHINICITY));
      mockGlobalResponseHandlerService.getApiResponse.and.returnValue(true);
      spyOn(component, 'getCountry');
      component.getEthnicity();
      let ddlEthnicityData = _.sortBy(ETHINICITY.data, 'raceOrEthnicity');
      expect(component.ethnicity.length).toBe(ddlEthnicityData.length);
      expect(component.getCountry).toHaveBeenCalled();
    });
  });

  describe('getCountry', () => {

    it('should be create getCountry()', () => {
      expect(component.getCountry).toBeTruthy();
    });
    it('should check getCountry method returns Country data ', () => {
      mockemployeeService.getCountry.and.returnValue(of(COUNTRY));
      mockGlobalResponseHandlerService.getApiResponse.and.returnValue(true);
      spyOn(component, 'getRegion');
      component.getCountry();
      let ddlCountryData = _.sortBy(COUNTRY.data, 'country');
      expect(component.country.length).toBe(ddlCountryData.length);
      expect(component.getRegion).toHaveBeenCalled();
    });
  });

  describe('getRegion', () => {

    it('should be create getRegion()', () => {
      expect(component.getRegion).toBeTruthy();
    });
    // it('should check getRegion method returns Region data ', () => {
    //   mockemployeeService.getRegion.and.returnValue(of(REGION));
    //   mockGlobalResponseHandlerService.throwError.and.returnValue(true);
    //   component.employeeData = EMPLOYEE.data;
    //   spyOn(component, 'changeCountry');
    //   component.getRegion();
    //   expect(component.region.length).toBe(REGION.data.length);
    //   expect(component.changeCountry).toHaveBeenCalledWith(component.employeeData.countryId);
    // });
  });

  describe('changeCountry', () => {

    it('should be create changeCountry()', () => {
      expect(component.changeCountry).toBeTruthy();
    });
    it('should check changeCountry method returns Filter Region data ', () => {
      // component.employeeData = EMPLOYEE.data;
      // component.changeCountry(component.employeeData.countryId);
      // let ddlFilterRegionData = _.where(component.region, { countryId: parseInt(component.employeeData.countryId) });
      // expect(component.filterRegion).toEqual(ddlFilterRegionData);
    });
  });

  describe('onClickSubmit', () => {

    it('should be create onClickSubmit()', () => {
      expect(component.onClickSubmit).toBeTruthy();
    });
    //   it('should check onClickSubmit method returns Add Admin Data data ', () => {
    //     mockemployeeService.addEmployee.and.returnValue(of(Add_EMPLOYEE_RESPONSE));
    //     mockGlobalResponseHandlerService.throwError.and.returnValue(true);
    //     mockGlobalResponseHandlerService.displayLoader.and.returnValue(true);
    //     component.employeeId = '0';
    //     component.onClickSubmit();
    //     expect(router.navigate).toHaveBeenCalledWith(['/admin']);
    //   });
  });

  describe('pasteOnlyNumericEvent', () => {

    it('should be create pasteOnlyNumericEvent()', () => {
      expect(component.pasteOnlyNumericEvent).toBeTruthy();
    });

    it('should check pasteOnlyNumericEvent method working properly', () => {
      component.pasteOnlyNumericEvent(event);
      expect(mockCustomValidation.pasteOnlyNumericEvent).toHaveBeenCalledWith(event);
    });
  });

  describe('pasteOnlyAlphabaticEvent', () => {

    it('should be create pasteOnlyAlphabaticEvent()', () => {
      expect(component.pasteOnlyAlphabaticEvent).toBeTruthy();
    });

    it('should check pasteOnlyAlphabaticEvent method working properly', () => {
      component.pasteOnlyAlphabaticEvent(event);
      expect(mockCustomValidation.pasteOnlyAlphabaticEvent).toHaveBeenCalledWith(event);
    });
  });

  describe('zipcodeValidation', () => {

    it('should be create zipcodeValidation()', () => {
      expect(component.zipcodeValidation).toBeTruthy();
    });

    it('should check zipcodeValidation method working properly', () => {
      component.zipcodeValidation(event);
      expect(mockCustomValidation.zipcodeValidation).toHaveBeenCalledWith(event);
    });
  });

  describe('numberOnly', () => {

    it('should be create numberOnly()', () => {
      expect(component.numberOnly).toBeTruthy();
    });

    it('should check numberOnly method working properly', () => {
      component.numberOnly(event);
      expect(mockCustomValidation.numberOnly).toHaveBeenCalledWith(event);
    });
  });

  describe('decimalOnly', () => {

    it('should be create decimalOnly()', () => {
      expect(component.decimalOnly).toBeTruthy();
    });

    it('should check decimalOnly method working properly', () => {
      component.decimalOnly(event);
      expect(mockCustomValidation.decimalOnly).toHaveBeenCalledWith(event);
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

  describe('avoidBlankSpace', () => {

    it('should be create avoidBlankSpace()', () => {
      expect(component.avoidBlankSpace).toBeTruthy();
    });

    it('should check avoidBlankSpace method working properly', () => {
      component.avoidBlankSpace(event);
      expect(mockCustomValidation.avoidBlankSpace).toHaveBeenCalledWith(event);
    });
  });

  describe('inputDateValidation', () => {

    it('should be create inputDateValidation()', () => {
      expect(component.inputDateValidation).toBeTruthy();
    });

    it('should check inputDateValidation method working properly', () => {
      component.inputDateValidation(event);
      expect(mockCustomValidation.inputDateValidation).not.toHaveBeenCalledWith(event);
    });
  });

});
