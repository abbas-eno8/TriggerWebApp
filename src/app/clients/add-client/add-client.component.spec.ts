import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientComponent } from './add-client.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TextMaskModule } from 'angular2-text-mask';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { CustomValidation } from '../../shared/Validation/custom.validation';
import { ActivatedRoute, Router } from '@angular/router';
import { EllipsisPipe } from '../../shared/pipes/ellipsis/ellipsis.pipe';
import { SharedModule } from '../../shared/shared.module';
import { mockUserData_Add, mockUserData } from '../../core/mock-data/mock-userdata';
import { INDUSTRYTYPE } from '../../core/mock-data/mock-industry-type';
import * as _ from 'underscore';
import { UrlEncryptionDecryptionService } from '../../core/url-encryption-decryption/url-encryption-decryption.service';
import { ClientService } from '../client-service/client.service';
import { MatDialog } from '@angular/material';

describe('AddClientComponent', () => {
  let component: AddClientComponent;
  let fixture: ComponentFixture<AddClientComponent>;
  let mockmatDialog, mockGlobalResponseHandlerService, mockCustomValidation, mockActivatedRoute, mockclientService, mockFormBuilder, mockurlEncryptionDecryptionService;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {
    mockActivatedRoute = {
      snapshot: { queryParams: { 'id': '0' } }
    };
    mockclientService = jasmine.createSpyObj(['addClient', 'getIndustryType', 'getClientById']);
    mockGlobalResponseHandlerService = jasmine.createSpyObj(['displayLoader', 'getApiResponse', 'getUserData', 'setPartialClientResponse']);
    mockCustomValidation = jasmine.createSpyObj(['pasteOnlyDecimalEvent', 'pasteOnlyNumericEvent', 'pasteOnlyAlphabaticEvent', 'zipcodeValidation', 'numberOnly', 'decimalOnly', 'AlphabaticharOnly', 'avoidBlankSpace', 'inputDateValidation']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, SharedModule, TextMaskModule, ReactiveFormsModule, BsDatepickerModule.forRoot()],
      declarations: [AddClientComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: UrlEncryptionDecryptionService, useValue: mockurlEncryptionDecryptionService },
        { provide: GlobalResponseHandlerService, useValue: mockGlobalResponseHandlerService },
        { provide: CustomValidation, useValue: mockCustomValidation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ClientService, useValue: mockclientService },
        { provide: FormBuilder, useValue: mockFormBuilder },
        { provide: MatDialog, useValue: mockmatDialog },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    mockGlobalResponseHandlerService.getApiResponse.and.returnValue(true);
    mockGlobalResponseHandlerService.displayLoader.and.returnValue(true);
    expect(component.getUser).toHaveBeenCalled();
    fixture = TestBed.createComponent(AddClientComponent);
    component = fixture.componentInstance;
  }));
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // describe('ngOnInit', () => {

  //   it('should be create ngOnInit()', () => {
  //     expect(component.ngOnInit).toBeTruthy();
  //   });

  //   it('should check ngOnInit working properly', () => {
  //     spyOn(component, 'initializeForm');
  //     component.ngOnInit();
  //     expect(component.initializeForm).toHaveBeenCalled();
  //   });

  // });

  // describe('initializeForm', () => {

  //   it('should be create initializeForm()', () => {
  //     expect(component.initializeForm).toBeTruthy();
  //   });

  //   it('should check initializeVariables working properly for Edit Client', () => {
  //     // mockGlobalResponseHandlerService.getUserData.and.returnValue(mockUserData)
  //     // spyOn(component, 'ReturnForm');
  //     // spyOn(component, 'getClientById');
  //     // spyOn(component, 'userRoleData');
  //     // component.initializeVariables();
  //     // expect(component.getClientById).toHaveBeenCalled();
  //     // expect(component.ReturnForm).toHaveBeenCalledWith(null);
  //     // expect(component.pageTitle).toBe(ClientModel.EditClient);
  //     // expect(component.userRoleData).toHaveBeenCalled();
  //   });

  //   it('should check initializeVariables working properly for Add Client', () => {
  //     // mockGlobalResponseHandlerService.getUserData.and.returnValue(mockUserData_Add)
  //     // spyOn(component, 'ReturnForm');
  //     // spyOn(component, 'getIndustryType');
  //     // spyOn(component, 'userRoleData');
  //     // component.initializeVariables();
  //     // expect(component.getIndustryType).toHaveBeenCalled();
  //     // expect(component.ReturnForm).toHaveBeenCalledWith(null);
  //     // expect(component.userRoleData).toHaveBeenCalled();
  //   });
  // });

  // // describe('userRoleData', () => {

  // //   it('should be create userRoleData()', () => {
  // //     expect(component.userRoleData).toBeTruthy();
  // //   });

  // //   it('should check userRoleData working properly', () => {
  // //     component.userRoleData();
  // //     //component.userRole = RoleEnum.Admin;
  // //     //expect(component.headerText).toBe(ClientModel.ClientProfile);
  // //     // expect(component.tooltipHeader).toBe(ClientModel.TooltipHeaderClientProfile);
  // //     // expect(component.tooltipDescription).toBe(ClientModel.TooltipDescriptionClientProfile);
  // //   });

  // // });


  // describe('onClickSubmitBtn', () => {

  //   it('should be create onClickSubmitBtn()', () => {
  //     expect(component.onClickSubmitBtn).toBeTruthy();
  //   });
  //   // it('should check onSubmitBtn method returns Add Client Data', () => {
  //   // // component.AddClientForm = CLIENTOBJECT;
  //   //   mockclientService.addClient.and.returnValue(of(CLIENT_ADD));
  //   //   spyOn(component, 'clientFormValidation').and.returnValue(true);
  //   //   component.userData = mockUserData_Add;
  //   //   component.onSubmitBtn();
  //   //   expect(router.navigate).toHaveBeenCalledWith([Route.CLIENT]);
  //   //   expect(mockclientService.addClient).toHaveBeenCalledWith(CLIENTOBJECT);
  //   // });
  // });

  // describe('getIndustryType', () => {

  //   it('should be create getIndustryType()', () => {
  //     expect(component.getIndustryType).toBeTruthy();
  //   });
  //   it('should check getIndustryType method returns Industry Type data ', () => {
  //     mockclientService.getIndustryType.and.returnValue(of(INDUSTRYTYPE));
  //     component.getIndustryType();
  //     let industryTypes = _.sortBy(INDUSTRYTYPE.data, 'industryType');
  //     expect(component.industryTypes.length).toBe(industryTypes.length);
  //   });
  // });

  // describe('getClientById', () => {

  //   it('should be create getClientById()', () => {
  //     expect(component.getClientById).toBeTruthy();
  //   });
  //   it('should check getClientById method returns client data ', () => {
  //     mockclientService.getClientById.and.returnValue(of(CLIENT));
  //     spyOn(component, 'setLogo');
  //     spyOn(component, 'getIndustryType');
  //     spyOn(component, 'bindData');
  //     component.getClientById();
  //     let clientData = CLIENT.data;
  //     expect(component.iconUrl).toBe(clientData[0].compImgPath);
  //     expect(component.setLogo).toHaveBeenCalledWith(component.iconUrl);
  //     expect(component.getIndustryType).toHaveBeenCalled();
  //     //expect(component.ReturnForm).toHaveBeenCalledWith(CLIENT.data);
  //   });
  // });

  // describe('pasteOnlyNumericEvent', () => {

  //   it('should be create pasteOnlyNumericEvent()', () => {
  //     expect(component.pasteOnlyNumericEvent).toBeTruthy();
  //   });

  //   it('should check pasteOnlyNumericEvent method working properly', () => {
  //     component.pasteOnlyNumericEvent(event);
  //     expect(mockCustomValidation.pasteOnlyNumericEvent).toHaveBeenCalledWith(event);
  //   });
  // });

  // // describe('pasteOnlyDecimalEvent', () => {

  // //   it('should be create pasteOnlyDecimalEvent()', () => {
  // //     expect(component.pasteOnlyDecimalEvent).toBeTruthy();
  // //   });

  // //   it('should check decimalOnly method working properly', () => {
  // //     component.pasteOnlyDecimalEvent(event);
  // //     expect(mockCustomValidation.pasteOnlyDecimalEvent).toHaveBeenCalledWith(event);
  // //   });
  // // });

  // describe('pasteOnlyAlphabaticEvent', () => {

  //   it('should be create pasteOnlyAlphabaticEvent()', () => {
  //     expect(component.pasteOnlyAlphabaticEvent).toBeTruthy();
  //   });

  //   it('should check pasteOnlyAlphabaticEvent method working properly', () => {
  //     component.pasteOnlyAlphabaticEvent(event);
  //     expect(mockCustomValidation.pasteOnlyAlphabaticEvent).toHaveBeenCalledWith(event);
  //   });
  // });

  // describe('numberOnly', () => {

  //   it('should be create numberOnly()', () => {
  //     expect(component.numberOnly).toBeTruthy();
  //   });

  //   it('should check numberOnly method working properly', () => {
  //     component.numberOnly(event, 'abc');
  //     expect(mockCustomValidation.numberOnly).toHaveBeenCalledWith(event);
  //   });
  // });

  // describe('zipcodeValidation', () => {

  //   it('should be create zipcodeValidation()', () => {
  //     expect(component.zipcodeValidation).toBeTruthy();
  //   });

  //   it('should check zipcodeValidation method working properly', () => {
  //     component.zipcodeValidation(event);
  //     expect(mockCustomValidation.zipcodeValidation).toHaveBeenCalledWith(event);
  //   });
  // });

  // // describe('decimalOnly', () => {

  // //   it('should be create decimalOnly()', () => {
  // //     expect(component.decimalOnly).toBeTruthy();
  // //   });

  // //   it('should check decimalOnly method working properly', () => {
  // //     component.decimalOnly(event, 'test');
  // //     expect(mockCustomValidation.decimalOnly).toHaveBeenCalledWith(event);
  // //   });
  // // });

  // describe('AlphabaticharOnly', () => {

  //   it('should be create AlphabaticharOnly()', () => {
  //     expect(component.AlphabaticharOnly).toBeTruthy();
  //   });

  //   it('should check AlphabaticharOnly method working properly', () => {
  //     component.AlphabaticharOnly(event, 'test');
  //     expect(mockCustomValidation.AlphabaticharOnly).toHaveBeenCalledWith(event);
  //   });
  // });

  // describe('avoidBlankSpace', () => {

  //   it('should be create avoidBlankSpace()', () => {
  //     expect(component.avoidBlankSpace).toBeTruthy();
  //   });

  //   it('should check avoidBlankSpace method working properly', () => {
  //     component.avoidBlankSpace(event);
  //     expect(mockCustomValidation.avoidBlankSpace).toHaveBeenCalledWith(event);
  //   });
  // });

  // describe('onValueChange', () => {

  //   it('should be create onValueChange()', () => {
  //     expect(component.onValueChange).toBeTruthy();
  //   });

  //   it('should check onValueChange method working properly', () => {
  //     component.onValueChange(event);
  //   });
  // });

  // describe('createForm', () => {

  //   it('should be create createForm()', () => {
  //     expect(component.createForm).toBeTruthy();
  //   });
  // });

  // // describe('getIconUrl', () => {

  // //   it('should be create getIconUrl()', () => {
  // //     expect(component.getIconUrl).toBeTruthy();
  // //   });
  // // });

  // describe('setLogo', () => {

  //   it('should be create setLogo()', () => {
  //     expect(component.setLogo).toBeTruthy();
  //   });

  //   it('should check setLogo method working properly', () => {
  //     component.user = mockUserData;
  //     component.setLogo('iconurl');
  //     expect(mockGlobalResponseHandlerService.setPartialClientResponse(component.user.clientId, '', false, 'iconurl'));
  //   });

  // });

});
