/**
@author : Anjali Tandel
@class : AddAdminComponent
@description :AddAdminComponent is created for perform add/edit operations.
**/
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
//  ................................................ //
import { CustomValidation } from '../../shared/Validation/custom.validation';
import * as _ from 'underscore';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { AddAdmin, EditAdmin } from '../admin-model';
import { ErrorMessage, Encryption } from '../../core/magic-string/common-validation-model';
import { RoleEnum, Route, True, Error_Type, Error_Title } from '../../core/magic-string/common.model';
import { UrlEncryptionDecryptionService } from '../../core/url-encryption-decryption/url-encryption-decryption.service';
import { ClientService } from '../../clients/client-service/client.service';
import { EmployeeService } from '../../core/services/employee-service/employee.service';
import { ProtectionLowLevel, GenderList, StatusList } from '../../shared/modals/shared-model';
import { GlobalEventsManager } from '../../core/navbar/globalEventsManager';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { SharedFunctionService } from '../../shared/services/shared-function/shared-function.service';
import { CommonService } from '../../core/services/common/common.service';
import { LoaderService } from '../../core/loader/loader.service';
import { ContactNumber } from '../../employees/employee-model';
@Component({
  selector: 'trigger-add-admin',
  templateUrl: './add-admin.component.html'
})
export class AddAdminComponent implements OnInit {
  public userData: any;
  public employeeData: any;
  public employeeId: number;
  public clients: any;
  public ethnicity: any;
  public country: any;
  public region: any;
  public filterRegion: any;
  public triggerRole: any;
  // isRegionfieldMandatory is boolean varioable for make region field make mandatory/optionl on change county
  public isRegionfieldMandatory: boolean;
  public pageTitle: string;
  // isEmployeeInactive used for set true/false value on change employee status and used in html
  public isEmployeeInactive: boolean;
  bsValue = new Date();
  bsRangeValue: Date[];
  minDate: Date;
  maxDate: Date;
  public timePickerTheme: NgxMaterialTimepickerTheme;
  //  Number mask used for formate number which is used to formate current salary
  numberMask = createNumberMask({
    prefix: '$',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    allowDecimal: true,
    allowNegative: false,
    allowLeadingZeroes: false,
    integerLimit: 7,
  })
  public callingCode: any;
  // AddEmployeeForm is defined as an instance of FormGroup:
  AddEmployeeForm: FormGroup
  public themeEmitter: any;
  public themeClass: string
  public isDarkTheme: boolean;
  public statusList: any[];
  public genderList: any[];
  public countryCodeList: any[];
  public selected: any;
  constructor(
    private router: Router,
    private toaster: ToasterService,
    private formBuilder: FormBuilder,
    private customValidation: CustomValidation,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    private globalEventsManager: GlobalEventsManager,
    private commonService: CommonService,
    private loaderService: LoaderService,

  ) {
    this.globalResponseHandlerService.displayLoader(true);
    // Define date range 
    this.bsRangeValue = [this.bsValue, this.maxDate];
    this.minDate = new Date('01-01-1900');
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate());

    // set isRegionfieldMandatory as false at initial level, By dafault Region field is optionl.
    this.isRegionfieldMandatory = false;
    this.isEmployeeInactive = false;
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
        this.themeClass = 'theme-dark';
      } else {
        this.isDarkTheme = false;
        this.themeClass = 'theme-default';
      }
    });
    this.statusList = StatusList;
    this.genderList = GenderList;
  }

  ngOnInit() {
    this.initializeForm();
    this.getCountryCode();
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }
  /**
  * Author : Mihir Patel
  * Modified-Date : 21-12-2018
  * Modified By : Anjali Tandel
  * Description : Create function for initialize form on add-employee & bind value on edit-employee
  */
  initializeForm() {
    //  Get login user data which are required
    const contactNumber: ContactNumber = new ContactNumber();
    this.selected = contactNumber.callingCode;
    this.userData = this.globalResponseHandlerService.getUserData();
    this.callingCode = this.userData.countryCallingCode;
    this.ReturnForm(null);
    let encryptedKey = this.activatedRoute.snapshot.queryParams['id'];
    this.employeeId = encryptedKey ? parseInt(this.urlEncryptionDecryptionService.urlDecryption(encryptedKey)) : 0;
    if (this.employeeId > 0) {
      this.pageTitle = EditAdmin;
      // this.getAdminById(this.employeeId);
      this.getCallingCode(this.employeeId)
    } else {
      this.pageTitle = AddAdmin;
      this.getCallingCode()
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date : 21-12-2018
  * Description : Create object for formgroup and assign value.
  */
  ReturnForm(object) {
    if (object != null) {
      let joiningDate = new Date(object.joiningDate);
      let lastPromodate = new Date(object.lastPromodate);
      let lastIncDate = new Date(object.lastIncDate);
      let dateOfBirth = new Date(object.dateOfBirth);
      let contactNumber = this.employeeService.splitContactNumber(object.phoneNumber);
      this.selected = contactNumber.callingCode;
      this.AddEmployeeForm = this.formBuilder.group({
        employeeId: [object.employeeId, [Validators.required]],
        firstName: [object.firstName, [Validators.required]],
        middleName: [object.middleName],
        lastName: [object.lastName, [Validators.required]],
        suffix: [object.suffix],
        emailAddress: [object.email, [Validators.required]],
        position: [object.jobTitle, [Validators.required]],
        phoneNo1: [contactNumber.phoneNumber, [Validators.required]],
        callingCode: [contactNumber.callingCode, [Validators.required]],
        dateOfHire: [joiningDate, [Validators.required]],
        city: [object.workCity, [Validators.required]],
        state: [object.workState, [Validators.required]],
        zip: [object.workZipcode, [Validators.required]],
        employeeStatus: [object.empStatus, [Validators.required]],
        manager: [object.managerId, [Validators.required]],
        protectionLevel: [object.protectionLevel, [Validators.required]],
        client: [object.companyid, [Validators.required]],
        triggerRole: [object.roleId, [Validators.required]],
        inTime: [object.inTime, [Validators.required]],
        outTime: [object.outTime, [Validators.required]],
        ethnicity: [object.raceorethanicityId],
        gender: [object.gender],
        jobCategory: [object.jobCategory],
        jobCode: [object.jobCode],
        jobGroup: [object.jobGroup],
        dateInPosition: [lastPromodate],
        currentSalary: [object.currentSalary || ''],
        dateOfLastSalaryIncrease: [lastIncDate],
        dateOfBirth: [dateOfBirth],
        locationName: [object.empLocation],
        countryName: [object.countryId],
        region: [object.regionId],
      });
      if (object.dateOfBirth === '1900-01-01T00:00:00') {
        this.AddEmployeeForm.controls['dateOfBirth'].patchValue('');
      }
      if (object.lastPromodate === '1900-01-01T00:00:00') {
        this.AddEmployeeForm.controls['dateInPosition'].patchValue('');
      }
      if (object.lastIncDate === '1900-01-01T00:00:00') {
        this.AddEmployeeForm.controls['dateOfLastSalaryIncrease'].patchValue('');
      }
    } else {
      this.AddEmployeeForm = this.formBuilder.group({
        employeeId: [],
        firstName: ['', [Validators.required]],
        middleName: [''],
        lastName: ['', [Validators.required]],
        suffix: ['0',],
        emailAddress: ['', [Validators.required]],
        position: ['', [Validators.required]],
        phoneNo1: ['', [Validators.required]],
        callingCode: [[], [Validators.required]],
        dateOfHire: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zip: ['', [Validators.required]],
        manager: ['0', [Validators.required]],
        protectionLevel: [ProtectionLowLevel, [Validators.required]],
        client: ['0', [Validators.required]],
        employeeStatus: [1, [Validators.required]],
        triggerRole: ['0', [Validators.required]],
        inTime: ['', [Validators.required]],
        outTime: ['', [Validators.required]],
        ethnicity: ['0',],
        gender: ['Male',],
        jobCategory: ['',],
        jobCode: ['',],
        jobGroup: ['',],
        dateInPosition: ['',],
        currentSalary: ['',],
        dateOfLastSalaryIncrease: ['',],
        dateOfBirth: ['',],
        locationName: ['',],
        countryName: ['0',],
        region: [0,],
      });
    }
  }
  /**
  * Author : Anjali Tandel
  * Modified-Date : 21-12-2018
  * Description : Call API for get Admin data by Admin id
  */
  getAdminById(adminId) {
    this.employeeService.getAdminById(this.userData.clientId, adminId).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
          this.employeeData = response.data;
          if (response.data) {
            if (!response.data.empStatus) {
              this.isEmployeeInactive = true;
            }
          }
          this.ReturnForm(response.data);
          this.getTriggerRole();
        }
      }
    );
  }

  getCallingCode(empId?) {
    if (empId) {
      this.getAdminById(empId);
    } else {
      this.getTriggerRole()
    }
    // this.callingCode = this.userData.countryCallingCode;
    // if (!this.callingCode) {
    //   this.employeeService.getCallingcode().subscribe(
    //     (getCountryCallingCode) => {
    //       if (getCountryCallingCode) {
    //         this.callingCode = getCountryCallingCode;
    //         this.callingCode = _.sortBy(this.callingCode, 'callingCodes');
    //         this.callingCode = this.callingCode.filter(c => (c.callingCodes[0] !== ''))
    //         this.callingCode.forEach((country) => {
    //           country.callingCodes[0] = '+' + (country.callingCodes[0]).replace(/\s/g, "");
    //         });
    //         var encryptedCallingCode = CryptoJS.AES.encrypt(JSON.stringify(this.callingCode), Encryption.TriggerCountryCallingCodeMessage);
    //         sessionStorage.setItem(Encryption.TriggerCountryCallingCodeKey, encryptedCallingCode.toString());
    //         if (empId) {
    //           this.getAdminById(empId);
    //         } else {
    //           this.getTriggerRole()
    //         }
    //       }
    //     }
    //   );
    // } else {
    //   if (empId) {
    //     this.getAdminById(empId);
    //   } else {
    //     this.getTriggerRole()
    //   }
    // }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date : 21-12-2018
  * Description : Call API for get employee trigger-role
  */
  getTriggerRole() {
    //this.globalResponseHandlerService.displayLoader(true);
    this.employeeService.getTriggerRole(this.userData.clientId).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
          this.triggerRole = _.where(response.data, { role: RoleEnum.Admin });
          this.AddEmployeeForm.patchValue({
            triggerRole: this.triggerRole[0].roleId,
            name: this.triggerRole[0].role
          });
          //this.getCallingCode();
          this.getClient();
        }
      }
    );
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date : 21-12-2018
  * Description : Call API for get all client
  */
  getClient() {
    this.clientService.getAllClient().subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
          this.clients = _.sortBy(response.data, 'companyName');
          this.getEthnicity();
        }
      }
    );
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date : 21-12-2018
  * Description : Call API for get list of ethnicity.
  */
  getEthnicity() {
    this.employeeService.getEthnicity().subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
          this.ethnicity = _.sortBy(response.data, 'raceOrEthnicity');
          this.getCountry();
        }
      }
    );
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date : 21-12-2018
  * Description : Call API for get list of country.
  */
  getCountry() {
    this.employeeService.getCountry().subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
          this.country = _.sortBy(response.data, 'country');
          this.getRegion();
        }
      }
    );
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date : 21-12-2018
  * Description : Call API for get list of region.
  */
  getRegion() {
    this.employeeService.getRegion().subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false, true)) {
          this.region = response.data;
          if (this.employeeData) {
            this.bindRegion(this.employeeData.countryId);
          }
        }
      }
    );
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date : 15-03-2019
  * Description : Create event for change country and get region by thier country.
  */
  changeCountry(selectedCountry) {
    this.AddEmployeeForm.controls['region'].patchValue(0);
    this.bindRegion(selectedCountry);
  }

  bindRegion(selectedCountry) {
    if (!!selectedCountry) {
      this.filterRegion = _.where(this.region, { countryId: parseInt(selectedCountry) });
      if (this.filterRegion.length > 0) {
        this.isRegionfieldMandatory = true;
      } else {
        this.isRegionfieldMandatory = false;
        this.AddEmployeeForm.controls['region'].patchValue(0);
      }
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  21-12-2018
  * Description : Create function for call API for add-edit admin data
  */
  onClickSubmit() {
    if (this.validateAdminForm()) {
      this.globalResponseHandlerService.displayLoader(true);
      if (this.employeeId === 0) {
        this.employeeService.addEmployee(this.AddEmployeeForm.value, this.employeeId).subscribe(
          (addEmployeeresponse) => {
            if (this.globalResponseHandlerService.getApiResponse(addEmployeeresponse)) {
              this.router.navigate([Route.Admin]);
            }
          }
        );
      } else {
        this.employeeService.updateEmployee(this.AddEmployeeForm.value, this.employeeId, this.employeeData.isMailSent).subscribe(
          (updateEmployeeresponse) => {
            if (this.globalResponseHandlerService.getApiResponse(updateEmployeeresponse)) {
              this.router.navigate([Route.Admin]);
            }
          }
        );
      }
    }
  }

  // ---------------------------------------------------------------Validation MEthods start ------------------------------------------------------------------ //
  /**
  * Author : Anjali Tandel
  * Modified-Date : 21-12-2018
  * Description : Create function for check form field validation on submit data.
  */
  validateAdminForm() {
    var alphabaticWithSpaceFormat = /^[a-zA-Z\'\s]*$/;
    var firstNamePattern = /^[a-zA-Z\'-\s]+$/i;
    let zip = this.AddEmployeeForm.value.zip + '';
    zip = zip.trim();
    if (this.employeeId > 0 && !this.AddEmployeeForm.value.employeeId) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.EmployeeId);
      return;
    } else if (this.employeeId > 0 && this.AddEmployeeForm.value.employeeId.length > 10) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.EmployeeIdInvalidLength);
      return;
    } else if (this.employeeId > 0 && (!this.AddEmployeeForm.get('employeeId').valid || !this.AddEmployeeForm.value.employeeId.replace(/\s/g, '').length)) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.EmployeeIdInvalid);
      return;
    } else if (!this.AddEmployeeForm.value.firstName || !this.AddEmployeeForm.value.firstName.replace(/\s/g, '').length) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.FirstName);
      return;
    } else if (!firstNamePattern.test(this.AddEmployeeForm.value.firstName) || !this.AddEmployeeForm.get('firstName').valid) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.FirstNameInvalid);
      return;
    } else if (this.AddEmployeeForm.value.firstName.length > 25) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.FirstNameLengthInvalid);
      return;
    } else if (!this.AddEmployeeForm.get('middleName').valid) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.MiddleNameInvalid);
      return;
    } else if (!this.AddEmployeeForm.value.lastName || !this.AddEmployeeForm.value.lastName.replace(/\s/g, '').length) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.LastName);
      return;
    } else if (!firstNamePattern.test(this.AddEmployeeForm.value.lastName) || !this.AddEmployeeForm.get('lastName').valid) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.LastNameInvalid);
      return;
    } else if (this.AddEmployeeForm.value.lastName.length > 25) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.LastNameLengthInvalid);
      return;
    } else if (!this.AddEmployeeForm.value.emailAddress || !this.AddEmployeeForm.value.emailAddress.replace(/\s/g, '').length) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.EmailAddress);
      return;
    }
    // else if (!this.AddEmployeeForm.get('emailAddress').valid) {
    //   this.toaster.pop(Error_Type, Error_Title, ErrorMessage.EmailAddressInvalid);
    //   return;
    // } 
    else if (this.AddEmployeeForm.value.phoneNo1 !== '' && (!this.AddEmployeeForm.get('phoneNo1').valid || isNaN(this.AddEmployeeForm.value.phoneNo1))) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.ClientPhoneNumberInvalid);
      return;
    }
    else if (!this.AddEmployeeForm.value.position || !this.AddEmployeeForm.value.position.replace(/\s/g, '').length) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.Position);
      return;
    } else if (!this.AddEmployeeForm.get('position').valid) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.PositionInvalid);
      return;
    } else if (this.AddEmployeeForm.value.position.length > 50) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.PositionLengthInvalid);
      return;
    } else if (!this.AddEmployeeForm.value.dateOfHire) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.DateOfHire);
      return;
    } else if (!this.AddEmployeeForm.get('dateOfHire').valid) {
      if (this.maxDate < this.AddEmployeeForm.value.dateOfHire) {
        this.toaster.pop(Error_Type, Error_Title, ErrorMessage.DateNotBeFuture);
      } else {
        this.toaster.pop(Error_Type, Error_Title, ErrorMessage.DateOfHireFormat);
        this.AddEmployeeForm.get('dateOfHire').reset();
      }
      return;
    } else if (!this.AddEmployeeForm.value.city || !this.AddEmployeeForm.value.city.replace(/\s/g, '').length) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.ClientCity);
      return;
    } else if (!this.AddEmployeeForm.get('city').valid || !isNaN(this.AddEmployeeForm.value.city) || !alphabaticWithSpaceFormat.test(this.AddEmployeeForm.value.city)) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.ClientCityInvalid);
      return;
    } else if (this.AddEmployeeForm.value.city.length > 30) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.ClientCityInvalidLength);
      return;
    } else if (!this.AddEmployeeForm.value.state || !this.AddEmployeeForm.value.state.replace(/\s/g, '').length) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.ClientState);
      return;
    } else if (!this.AddEmployeeForm.get('state').valid || !isNaN(this.AddEmployeeForm.value.state) || !alphabaticWithSpaceFormat.test(this.AddEmployeeForm.value.state)) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.ClientStateInvalid);
      return;
    } else if (this.AddEmployeeForm.value.state.length > 25) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.ClientStateInvalidLength);
      return;
    } else if (!this.AddEmployeeForm.value.zip) {
      this.toaster.pop(ErrorMessage.ClientZip);
    } else if (!this.AddEmployeeForm.get('zip').valid) {
      this.toaster.pop(ErrorMessage.ClientZipInvalid);
    } else if (this.AddEmployeeForm.value.zip.length < 5 || this.AddEmployeeForm.value.zip.length > 15 || zip.replace(/\s/g, '').length < 5) {
      this.toaster.pop(ErrorMessage.ClientZipInvalidLength);
    } else if (this.AddEmployeeForm.value.client === '0') {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.SelectClient);
      return;
    } else if (this.AddEmployeeForm.value.triggerRole === '0') {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.SelectRole);
      return;
    } else if (!this.AddEmployeeForm.value.inTime) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.InTime);
      return;
    } else if (!this.AddEmployeeForm.value.outTime) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.OutTime);
      return;
    } else if (!alphabaticWithSpaceFormat.test(this.AddEmployeeForm.value.locationName)) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.LocationName);
      return;
    } else if (!this.AddEmployeeForm.get('dateInPosition').valid && this.AddEmployeeForm.value.dateInPosition !== null) {
      if (this.maxDate < this.AddEmployeeForm.value.dateInPosition) {
        this.toaster.pop(Error_Type, Error_Title, ErrorMessage.DateNotBeFuture);
      } else {
        this.toaster.pop(Error_Type, Error_Title, ErrorMessage.DateInPositionFormat);
        this.AddEmployeeForm.get('dateInPosition').reset();
      }
      return;
    } else if (!this.AddEmployeeForm.get('dateOfLastSalaryIncrease').valid && this.AddEmployeeForm.value.dateOfLastSalaryIncrease !== null) {
      if (this.maxDate < this.AddEmployeeForm.value.dateOfLastSalaryIncrease) {
        this.toaster.pop(Error_Type, Error_Title, ErrorMessage.DateNotBeFuture);
      } else {
        this.toaster.pop(Error_Type, Error_Title, ErrorMessage.DateOfLastSalaryIncreaseFormat);
        this.AddEmployeeForm.get('dateOfLastSalaryIncrease').reset();
      }
      return;
    } else if (!this.AddEmployeeForm.get('dateOfBirth').valid && this.AddEmployeeForm.value.dateOfBirth !== null) {
      if (this.maxDate < this.AddEmployeeForm.value.dateOfBirth) {
        this.toaster.pop(Error_Type, Error_Title, ErrorMessage.DateNotBeFuture);
      } else {
        this.toaster.pop(Error_Type, Error_Title, ErrorMessage.DateFormat);
        this.AddEmployeeForm.get('dateOfBirth').reset();
      }
      return;
    } else if (new Date(this.AddEmployeeForm.value.dateOfHire) >= new Date(this.AddEmployeeForm.value.dateInPosition) && this.AddEmployeeForm.value.dateInPosition !== null) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.DateInPositionInvalid);
      return;
    } else if (new Date(this.AddEmployeeForm.value.dateOfHire) >= new Date(this.AddEmployeeForm.value.dateOfLastSalaryIncrease) && this.AddEmployeeForm.value.dateOfLastSalaryIncrease !== null) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.LastSalaryIncreaseInvalid);
      return;
    } else if (new Date(this.AddEmployeeForm.value.dateInPosition) > new Date(this.AddEmployeeForm.value.dateOfLastSalaryIncrease) && this.AddEmployeeForm.value.dateOfLastSalaryIncrease !== null && this.AddEmployeeForm.value.dateInPosition !== null) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.DateOfLAsrIncreaseSalaryInvalid);
      return;
    } else if (new Date(this.AddEmployeeForm.value.dateOfHire) <= new Date(this.AddEmployeeForm.value.dateOfBirth) && this.AddEmployeeForm.value.dateOfBirth !== null) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.DateOfBirthInvalid);
      return;
    } else if (this.isRegionfieldMandatory && parseInt(this.AddEmployeeForm.value.region) === 0) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.SelectRegion);
      return;
    }
    return true;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  17-04-2019
   * Description : Create event for disabled emailaddress & triggerRole while employeeStatus is inactive
   */
  onSelectInactive(id: string): void {
    if (this.employeeId > 0) {
      if (parseInt(id) !== 1) {
        this.isEmployeeInactive = true;
        this.employeeData.empStatus = parseInt(id);
        this.AddEmployeeForm.get('emailAddress').setValue(this.employeeData.email);
      } else {
        this.isEmployeeInactive = false;
      }
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date : 21-12-2018
  * Description : Check validation on krypress event for input type
  */

  // paste the numeric value
  public pasteOnlyNumericEvent($event: any) {
    this.customValidation.pasteOnlyNumericEvent(event);
  }

  // paste the alphabatic value
  public pasteOnlyAlphabaticEvent($event: any) {
    this.customValidation.pasteOnlyAlphabaticEvent(event);
  }

  // Accept only numeric value
  zipcodeValidation(event: any) {
    this.customValidation.zipcodeValidation(event);
    this.avoidBlankSpace(event);
  }

  // Accept number only
  numberOnly(event: any) {
    this.customValidation.numberOnly(event);
    this.avoidBlankSpace(event);
  }

  // Accept only decimal value
  decimalOnly(event: any) {
    this.customValidation.decimalOnly(event);
    this.avoidBlankSpace(event);
  }

  // Accept only alphabatic value 
  AlphabaticharOnly(event: any) {
    this.customValidation.AlphabaticharOnly(event);
    this.avoidBlankSpace(event);
  }

  // Accept only alphabatic value
  AlphabaticharOnlyWithNoSpace(event: any) {
    this.customValidation.EmployeeNameValidation(event);
  }

  // Accept only alphabatic value
  nameValidation(event: any) {
    this.customValidation.nameValidation(event);
  }

  // Ignore space when pasting the code
  public IgnoreSpace($event: any) {
    this.customValidation.IgnoreSpace(event);
  }

  // Ignore first white space
  avoidBlankSpace(event: any) {
    this.customValidation.avoidBlankSpace(event);
  }

  // Input Date validation
  inputDateValidation(event: any) {
    if (event != null) {
      this.customValidation.inputDateValidation(event);
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : keypress event for phone-number validation.
   */
  phoneNumberValidation(event: any) {
    this.customValidation.phoneNumberOnly(event);
  }

  public getCountryCode() {
    this.globalResponseHandlerService.displayLoader(true);
    this.commonService.getCountryCode().subscribe(
      (items: any) => {
        this.globalResponseHandlerService.displayLoader(false);
        this.countryCodeList = items;
      });
  }
  // --------------------------------------------------------------------Validation methods end------------------------------------------------------------//
}
