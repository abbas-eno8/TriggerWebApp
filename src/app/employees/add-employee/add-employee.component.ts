/**
@author : Anjali Tandel
@class : AddEmployeeComponent
@description :AddEmployeeComponent is created for add-edit employee.
**/
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { MatDialog } from '@angular/material';
//  ................................................ //
import { CustomValidation } from '../../shared/Validation/custom.validation';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { ToasterService } from 'angular2-toaster';
import { EmployeeModel, ContactNumber } from '../employee-model';
import { DepartmentModel } from '../../department/department.model';
import { ErrorMessage, Encryption } from '../../core/magic-string/common-validation-model';
import { RoleEnum, Route, True, Error_Type, Error_Title, ApiResponseStatus, Role } from '../../core/magic-string/common.model';
import { UrlEncryptionDecryptionService } from '../../core/url-encryption-decryption/url-encryption-decryption.service';
import { AddEditDepartmentComponent } from '../../shared/modal-popup/add-edit-department/add-edit-department.component';
import { ContentModalComponent } from '../../shared/modal-popup/content-modal/content-modal.component';
import { ModalContent } from '../../shared/modal-popup/content-modal/conten-modal-model';
import * as CryptoJS from 'crypto-js';
import { EmployeeService } from '../../core/services/employee-service/employee.service';
import { GenderList, ProtectionLowLevel, StatusList } from '../../shared/modals/shared-model';
import { SortByFieldService } from '../../shared/services/sort-by-field/sort-by-field.service';
import { GlobalEventsManager } from '../../core/navbar/globalEventsManager';
import { EmailAddress } from '../../core/magic-string/Regex-pattern';
import { CommonService } from '../../core/services/common/common.service'
import { CountryCode } from '../../core/model/user';

@Component({
  selector: 'trigger-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // add this 
})
export class AddEmployeeComponent implements OnInit {
  public userData: any;
  public departmentObject: number = 0;
  public isDisaplyEmployeeId: boolean;
  public employeeData: any = [];
  public employeeId: number;
  public ddlDepartment: any;
  public ddlTriggerRole: any;
  public ddlEthnicity: any;
  public ddlCountry: any;
  public ddlRegion: any;
  public ddlFilterRegion: any;
  public ddlManager: any;
  public ddlFilterManager: any;
  public protectionLevels: any;
  public pageTitle: string;
  bsValue = new Date();
  minDate: Date;
  maxDate: Date;
  public empId: number;
  isExecutive: boolean;
  // isRegionfieldMandatory is boolean variaable for make region field make mandatory/optionl on change county
  public isRegionfieldMandatory: boolean;
  // isEmployeeInactive used for set true/false value on change employee status and used in html
  public isEmployeeInactive: boolean;
  mask: any[] = ['$', ' ', /[1-9]/, ',', /\d/, /\d/, /\d/, '.', /\d/, /\d/];
  numberMask = createNumberMask({
    prefix: '$',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    allowDecimal: true,
    allowNegative: false,
    allowLeadingZeroes: false,
    integerLimit: 7
  })
  public callingCode: any;
  //AddEmployeeForm is defined as an instance of FormGroup:
  AddEmployeeForm: FormGroup
  public isDarkTheme: boolean;
  public themeEmitter: any;
  public themeClass: string;
  public statusList: any[];
  public genderList: any[];
  public countryCodeList: any[];
  public selected: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private customValidation: CustomValidation,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private toasterService: ToasterService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    private matDialog: MatDialog,
    private sortByFieldService: SortByFieldService,
    private globalEventsManager: GlobalEventsManager,
    private commonService: CommonService,
    private cdr: ChangeDetectorRef,
  ) {
    const contactNumber: ContactNumber = new ContactNumber();
    this.selected = contactNumber.callingCode;
    this.globalResponseHandlerService.displayLoader(true);
    this.minDate = new Date('01-01-1900');
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate());

    // set isRegionfieldMandatory as false at initial level, By dafault Region field is optionl.
    this.isRegionfieldMandatory = false;
    // set isEmailOptional as false at initial level, By dafault email-address field is mandatory.
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
    this.getCountryCode();
  }

  ngOnInit() {
    this.userData = this.globalResponseHandlerService.getUserData();
    this.ReturnForm(null);
    let encryptedKey = this.activatedRoute.snapshot.queryParams['id'];
    this.employeeId = encryptedKey ? parseInt(this.urlEncryptionDecryptionService.urlDecryption(encryptedKey)) : 0;
    if (this.employeeId === 0) {
      this.pageTitle = EmployeeModel.AddEmployee;
      this.getCallingCode();
    } else {
      this.pageTitle = EmployeeModel.EditEmployee;
      if (this.userData.roleId == Role.Admin || this.userData.roleId == Role.TriggerAdmin) {
        this.isDisaplyEmployeeId = true;
      }
      this.getCallingCode(this.employeeId);
    }
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }
  getCallingCode(empId?) {
    if (empId) {
      this.getEmployeeById(empId);
    } else {
      this.getTriggerRole()
    }
    // this.callingCode = this.userData.countryCallingCode;
    // if (!this.callingCode) {
    //   this.employeeService.getCallingcode().subscribe(
    //     (getCountryCallingCode) => {
    //       if (getCountryCallingCode) {
    //         this.callingCode = getCountryCallingCode
    //         this.callingCode = _.sortBy(this.callingCode, 'callingCodes');
    //         this.callingCode = this.callingCode.filter(c => (c.callingCodes[0] !== ''))
    //         this.callingCode.forEach((country) => {
    //           country.callingCodes[0] = '+' + (country.callingCodes[0]).replace(/\s/g, "");
    //         });
    //         var encryptedCallingCode = CryptoJS.AES.encrypt(JSON.stringify(this.callingCode), Encryption.TriggerCountryCallingCodeMessage);
    //         sessionStorage.setItem(Encryption.TriggerCountryCallingCodeKey, encryptedCallingCode.toString());
    //         if (empId) {
    //           this.getEmployeeById(empId);
    //         } else {
    //           this.getTriggerRole()
    //         }
    //       }
    //     }
    //   );
    // } else {
    //   if (empId) {
    //     this.getEmployeeById(empId);
    //   } else {
    //     this.getTriggerRole()
    //   }
    // }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  25-12-2018
  * Description : Create function for call API for add-edit employee data
  */
  public addEmployee() {
    if (this.employeeFormValidation(this.AddEmployeeForm.value)) {
      this.globalResponseHandlerService.displayLoader(true);
      if (this.employeeId === 0) {
        this.employeeService.addEmployee(this.AddEmployeeForm.value, this.employeeId).subscribe(
          (addEmployeeresponse) => {
            if (this.globalResponseHandlerService.getApiResponse(addEmployeeresponse)) {
              this.router.navigate([Route.Employee]);
            }
          }
        );
      } else {
        this.employeeService.updateEmployee(this.AddEmployeeForm.value, this.employeeId, this.employeeData.isMailSent).subscribe(
          (updateEmployeeresponse) => {
            if (this.globalResponseHandlerService.getApiResponse(updateEmployeeresponse)) {
              if (this.userData.roleId == Role.Admin && this.userData.loginEmpId === this.empId) {
                this.globalResponseHandlerService.setUserName(this.AddEmployeeForm.value.firstName, this.AddEmployeeForm.value.lastName);
              }
              this.router.navigate([Route.Employee]);
            }
          }
        );
      }
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-By :  Mihir Patel
  * Modified-Date :  22-2-2019
  * Description : Called API for get employee data by employee id for both case : 
  */
  getEmployeeById(id) {
    if (this.userData.roleId === Role.TriggerAdmin) {
      //  This Api is calling for Trigger-Admin case to get employee detail by companyId and Employee id: 
      this.employeeService.getTriggerEmployeeById(this.userData.clientId, id).subscribe(
        (getEmployeeByIdresponse) => {
          if (this.globalResponseHandlerService.getApiResponse(getEmployeeByIdresponse, false, false)) {
            if (!_.isEmpty(getEmployeeByIdresponse.data)) {
              this.employeeData = getEmployeeByIdresponse.data;
              this.empId = this.employeeData.empId;
              this.getTriggerRole();
            }
          }
        }
      );
    } else {
      //  This Api is calling for Admin, Manager, Executive Case to get employee detail by Employee id: 
      this.employeeService.getEmployeeById(id).subscribe(
        (getEmployeeByIdresponse) => {
          if (this.globalResponseHandlerService.getApiResponse(getEmployeeByIdresponse, false, false)) {
            if (!_.isEmpty(getEmployeeByIdresponse.data)) {
              this.employeeData = getEmployeeByIdresponse.data;
              this.empId = this.employeeData.empId;
              if (this.userData.loginEmpId === this.empId) {
                this.globalResponseHandlerService.setUserName(this.employeeData.firstName, this.employeeData.lastName);
              }
              this.getTriggerRole();
            }
          }
        }
      );
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  25-12-2018
  * Description : Called API for get trigger-role dropdown
  */
  getTriggerRole() {
    this.employeeService.getTriggerRole(this.userData.clientId).subscribe(
      (getTriggerRoleresponse) => {
        if (getTriggerRoleresponse.data && getTriggerRoleresponse.data.length === 0) {
          this.openDialog();
        } else if (this.globalResponseHandlerService.getApiResponse(getTriggerRoleresponse, false, false)) {
          this.ddlTriggerRole = _.sortBy(getTriggerRoleresponse.data, 'role');
          this.getEthnicity();
        }
      }
    );
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  25-12-2018
  * Description : Called API for get Ethnicity dropdown list
  */
  getEthnicity() {
    this.employeeService.getEthnicity().subscribe(
      (getEthnicityresponse) => {
        if (this.globalResponseHandlerService.getApiResponse(getEthnicityresponse, false, false)) {
          this.ddlEthnicity = _.sortBy(getEthnicityresponse.data, 'raceOrEthnicity');
          this.getCountry();
        }
      }
    );
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  25-12-2018
  * Description : Called API for get Country dropdown list
  */
  getCountry() {
    this.employeeService.getCountry().subscribe(
      (getCountryresponse) => {
        if (this.globalResponseHandlerService.getApiResponse(getCountryresponse, false, false)) {
          this.ddlCountry = _.sortBy(getCountryresponse.data, 'country');
          this.getRegion();
        }
      }
    );
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  25-12-2018
  * Description : Called API for get Region dropdown list
  */
  getRegion() {
    this.employeeService.getRegion().subscribe(
      (getRegionresponse) => {
        if (this.globalResponseHandlerService.getApiResponse(getRegionresponse, false, false)) {
          this.ddlRegion = getRegionresponse.data;
          if (!_.isEmpty(this.employeeData)) {
            this.bindRegion(this.employeeData.countryId)
          }
          this.getManager();
        }
      }
    );
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  30-03-2019
  * Description : Create event for get region by their client
  */
  changeCountry(selectedCountry) {
    this.AddEmployeeForm.controls['region'].patchValue(0);
    this.bindRegion(selectedCountry);
  }

  public chnageStatus(status) {
    console.log(status);
  }

  bindRegion(selectedCountry) {
    if (!!selectedCountry) {
      this.ddlFilterRegion = _.where(this.ddlRegion, { countryId: parseInt(selectedCountry) });
      if (this.ddlFilterRegion.length > 0) {
        this.isRegionfieldMandatory = true;
      } else {
        this.isRegionfieldMandatory = false;
        this.AddEmployeeForm.controls['region'].patchValue(0);
      }
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  25-12-2018
  * Description : Called API for get reporting-manager dropdown
  */
  getManager() {
    this.employeeService.getAllManager(this.userData.clientId).subscribe(
      (getAllManagerresponse) => {
        if (this.userData.roleId === Role.TriggerAdmin && getAllManagerresponse.data && getAllManagerresponse.data.length === 0) {
          this.openDialog();
        } else if (this.globalResponseHandlerService.getApiResponse(getAllManagerresponse, false, false)) {
          this.ddlManager = getAllManagerresponse.data;
          if (!_.isEmpty(this.ddlManager)) {
            this.ddlManager = this.ddlManager.filter(o => ((o.roleId !== Role.Employee) && o.empStatus && this.employeeId != o.empId))
            this.ddlManager = this.ddlManager.sort((a, b) => this.customValidation._sortAlphanumeric(a.firstName, b.firstName))
            this.ddlFilterManager = this.ddlManager;
            if (!_.isEmpty(this.employeeData)) {
              this.changeTriggerRole();
            }
            if (this.employeeId > 0) {
              if (!this.employeeData.empStatus) {
                this.isEmployeeInactive = true;
              }
              this.ReturnForm(this.employeeData);
            }
            this.getDepartmentByClientId();
          }
        }
      }
    );
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  25-12-2018
  * Description : Called API for get department by client Id
  */
  getDepartmentByClientId() {
    this.employeeService.getDepartmentByClientId(this.userData.clientId).subscribe(
      (getDepartmentByClientIdresponse) => {
        if (getDepartmentByClientIdresponse.data && getDepartmentByClientIdresponse.data.length === 0) {
          this.openDialog();
        } else if (this.globalResponseHandlerService.getApiResponse(getDepartmentByClientIdresponse, false, false)) {
          this.departmentObject = getDepartmentByClientIdresponse.data.length;
          this.globalResponseHandlerService.encriptData(JSON.stringify(this.departmentObject), Encryption.TriggerDepartmentObjectMessage, Encryption.TriggerDepartmentObjectKey);
          this.ddlDepartment = _.where(getDepartmentByClientIdresponse.data, { isSelected: 1 });
          this.ddlDepartment = _.sortBy(this.ddlDepartment, 'department');
          this.getProtectionLevel();
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 26-02-2020
   * Description : API for getting protection levels.
   */
  private getProtectionLevel(): void {
    this.employeeService.getProtectionLevel(this.userData.clientId).subscribe(
      (getProtectionLevelresponse) => {
        if (this.globalResponseHandlerService.getApiResponse(getProtectionLevelresponse, false, true)) {
          this.protectionLevels = getProtectionLevelresponse.data;
          this.protectionLevels = this.sortByFieldService.sortByField(this.protectionLevels, 'dimensionElement');
          this.cdr.detectChanges();
        }
      },
    );
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  25-12-2018
  * Description : Create event on change trigger-role
  */
  changeTriggerRole(value?: any) {
    let role = '';
    if (this.employeeData.role) {
      role = this.employeeData.role;
    }
    if (value) {
      role = value.target.options[value.target.selectedIndex].text;
    }
    if (role === RoleEnum.Executive) {
      this.isExecutive = true;
      //this.AddEmployeeForm.get('manager').disable();
      this.AddEmployeeForm.get('manager').setValue('0');
      this.ddlManager = this.ddlFilterManager.filter(o => o.roleId === Role.Executive);
    } else {
      this.isExecutive = false;
      //this.AddEmployeeForm.get('manager').enable();
      this.ddlManager = this.ddlFilterManager;
      if (role === RoleEnum.Admin) { //Admin
        this.ddlManager = this.ddlFilterManager.filter(o => (o.roleId === Role.Executive || o.roleId === Role.Admin));
      }
      // When user is manager so they are visible only non-manager
      if (role === RoleEnum.Manager) {
        this.ddlManager = this.ddlManager.filter(o =>
          (o.roleId === Role.Admin || o.roleId === Role.Manager || o.roleId === Role.Executive));
      }
    }
  }
  /**
  * Author : Anjali Tandel
  * Modified-Date :  25-12-2018
  * Description : Create object for formgroup and assign value .
  */
  ReturnForm(object) {
    if (object === null) {
      this.AddEmployeeForm = this.formBuilder.group({
        employeeId: [],
        firstName: ['', [Validators.required]],
        middleName: [''],
        lastName: ['', [Validators.required]],
        suffix: ['0',],
        emailAddress: ['', [Validators.pattern(EmailAddress)]],
        position: ['', [Validators.required]],
        phoneNo1: ['', [Validators.required]],
        callingCode: [[], [Validators.required]],
        dateOfHire: ['', [Validators.required]],

        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zip: ['', [Validators.required]],
        departmentName: ['0', [Validators.required]],

        manager: ['0', [Validators.required]],
        protectionLevel: [ProtectionLowLevel, [Validators.required]],
        client: [this.userData.clientId, [Validators.required]],
        employeeStatus: [1, [Validators.required]],

        inTime: ['', [Validators.required]],
        outTime: ['', [Validators.required]],

        triggerRole: ['0', [Validators.required]],
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
    } else {
      let joiningDate = new Date(object.joiningDate);
      let lastPromodate = new Date(object.lastPromodate);
      let lastIncDate = new Date(object.lastIncDate);
      let dateOfBirth = new Date(object.dateOfBirth);
      let contactNumber = this.employeeService.splitContactNumber(object.phoneNumber);
      this.selected = contactNumber.callingCode;
      this.AddEmployeeForm.get('callingCode').patchValue(contactNumber.callingCode);
      this.AddEmployeeForm = this.formBuilder.group({
        employeeId: [object.employeeId, [Validators.required]],
        firstName: [object.firstName, [Validators.required]],
        middleName: [object.middleName],
        lastName: [object.lastName, [Validators.required]],

        suffix: [object.suffix,],
        emailAddress: [object.email, [Validators.pattern(EmailAddress)]],
        position: [object.jobTitle, [Validators.required]],
        phoneNo1: [contactNumber.phoneNumber, [Validators.required]],
        callingCode: [contactNumber.callingCode, [Validators.required]],
        dateOfHire: [joiningDate, [Validators.required]],

        city: [object.workCity, [Validators.required]],
        state: [object.workState, [Validators.required]],
        zip: [object.workZipcode, [Validators.required]],
        departmentName: [object.departmentId, [Validators.required]],

        employeeStatus: [object.empStatus, [Validators.required]],
        manager: [object.managerId, [Validators.required]],
        protectionLevel: [object.protectionLevel, [Validators.required]],
        client: [object.companyid, [Validators.required]],
        triggerRole: [object.roleId, [Validators.required]],

        inTime: [object.inTime, [Validators.required]],
        outTime: [object.outTime, [Validators.required]],

        ethnicity: [object.raceorethanicityId,],
        gender: [object.gender,],
        jobCategory: [object.jobCategory,],
        jobCode: [object.jobCode,],

        jobGroup: [object.jobGroup,],
        dateInPosition: [lastPromodate || ''],
        currentSalary: [object.currentSalary || '',],
        dateOfLastSalaryIncrease: [lastIncDate || ''],

        dateOfBirth: [dateOfBirth || ''],
        locationName: [object.empLocation,],
        countryName: [object.countryId,],
        region: [object.regionId,],
      });
      this.AddEmployeeForm.controls['callingCode'].patchValue(contactNumber.callingCode);
      if (object.dateOfBirth === '1900-01-01T00:00:00') {
        this.AddEmployeeForm.controls['dateOfBirth'].patchValue('');
      }
      if (object.lastPromodate === '1900-01-01T00:00:00') {
        this.AddEmployeeForm.controls['dateInPosition'].patchValue('');
      }
      if (object.lastIncDate === '1900-01-01T00:00:00') {
        this.AddEmployeeForm.controls['dateOfLastSalaryIncrease'].patchValue('');
      }
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date : 25-12-2018
  * Description : Mthods created For validation on input type
  */
  // paste the numeric value
  public pasteOnlyNumericEvent($event: any) {
    this.customValidation.pasteOnlyNumericEvent(event);
  }

  // paste the alphabatic value
  public pasteOnlyAlphabaticEvent($event: any) {
    this.customValidation.pasteOnlyAlphabaticEvent(event);
  }
  // Ignore space when pasting the code
  IgnoreSpace($event: any) {
    this.customValidation.IgnoreSpace(event);
  }
  // Accept number only
  numberOnly(event: any) {
    this.customValidation.numberOnly(event);
    this.avoidBlankSpace(event);
  }
  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : keypress event for phone-number validation.
   */
  phoneNumberValidation(event: any) {
    this.customValidation.phoneNumberOnly(event);
  }
  // Accept only numeric value
  zipcodeValidation(event: any) {
    this.customValidation.zipcodeValidation(event);
    this.avoidBlankSpace(event);
  }
  // // Accept only decimal value
  // decimalOnly(event: any) {
  //   this.customValidation.decimalOnly(event);
  //   this.avoidBlankSpace(event);
  // }
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
   * Modified-Date :  18-03-2019
   * Descriotion : Open static modal-popup when do department is found.
   */
  openDialog() {
    this.globalResponseHandlerService.displayLoader(false);
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    this.matDialog.open(ContentModalComponent, {
      panelClass: ['lg-dialog-container', modalBackground],
      // panelClass: 'lg-dialog-container',
      position: {
        top: '',
        bottom: '',
        left: '',
        right: ''
      },
      data: {
        value: ModalContent.NoAccessContent,
        client: this.userData.clientName
      },
    });
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  26-12-2018
  * Description : Create function add-edit employee form field validation on click submit
  */
  employeeFormValidation(formValue) {
    var alphabaticWithSpaceFormat = /^[a-zA-Z\'\s]*$/;
    var firstNamePattern = /^[a-zA-Z\'-\s]+$/i;
    let zip = formValue.zip + '';
    zip = zip.trim();
    if (this.isDisaplyEmployeeId && !formValue.employeeId) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.EmployeeId);
    } else if (this.isDisaplyEmployeeId && !this.AddEmployeeForm.get('employeeId').valid) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.EmployeeIdInvalid);
    } else if (!formValue.firstName || !formValue.firstName.replace(/\s/g, '').length) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.FirstName);
    } else if (this.AddEmployeeForm.value.firstName.length > 25) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.FirstNameLengthInvalid);
    } else if (!firstNamePattern.test(formValue.firstName) || !this.AddEmployeeForm.get('firstName').valid) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.FirstNameInvalid);
    } else if (!this.AddEmployeeForm.get('middleName').valid) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.MiddleNameInvalid);
    } else if (!formValue.lastName || !formValue.lastName.replace(/\s/g, '').length) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.LastName);
    } else if (!firstNamePattern.test(formValue.lastName) || !this.AddEmployeeForm.get('lastName').valid) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.LastNameInvalid);
    } else if (this.AddEmployeeForm.value.lastName.length > 25) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.LastNameLengthInvalid);
    } else if (!formValue.emailAddress) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.EmailAddress);
    }
    else if (!this.AddEmployeeForm.get('emailAddress').valid && formValue.emailAddress) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.EmailAddressInvalid);
    }
    else if (this.AddEmployeeForm.value.phoneNo1 !== '' && (!this.AddEmployeeForm.get('phoneNo1').valid || isNaN(this.AddEmployeeForm.value.phoneNo1))) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.ClientPhoneNumberInvalid);
      return;
    }
    else if (!formValue.position || !formValue.position.replace(/\s/g, '').length) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.Position);
    } else if (!this.AddEmployeeForm.get('position').valid) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.PositionInvalid);
    } else if (!formValue.dateOfHire) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.DateOfHire);
    } else if (!this.AddEmployeeForm.get('dateOfHire').valid) {
      if (this.maxDate < formValue.dateOfHire) {
        this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.DateNotBeFuture);
      } else {
        this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.DateOfHireFormat);
        this.AddEmployeeForm.get('dateOfHire').reset();
      }
    } else if (!formValue.city || !formValue.city.replace(/\s/g, '').length) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.ClientCity);
    } else if (!this.AddEmployeeForm.get('city').valid || !isNaN(formValue.city) || !alphabaticWithSpaceFormat.test(formValue.city)) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.ClientCityInvalid);
    } else if (this.AddEmployeeForm.value.city.length > 30) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.ClientCityInvalidLength);
    } else if (!formValue.state || !formValue.state.replace(/\s/g, '').length) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.ClientState);
    } else if (!this.AddEmployeeForm.get('state').valid || !isNaN(formValue.state) || !alphabaticWithSpaceFormat.test(formValue.state)) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.ClientStateInvalid);
    } else if (this.AddEmployeeForm.value.state.length > 25) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.ClientStateInvalidLength);
    } else if (!this.AddEmployeeForm.value.zip) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.ClientZip);
    } else if (!this.AddEmployeeForm.get('zip').valid) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.ClientZipInvalid);
    } else if (this.AddEmployeeForm.value.zip.length < 5 || this.AddEmployeeForm.value.zip.length > 15 || zip.replace(/\s/g, '').length < 5) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.ClientZipInvalidLength);
    } else if (parseInt(formValue.departmentName) == 0 || formValue.departmentName == 'addNewDepartment') {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.SelectDepartment);
    } else if (!formValue.employeeStatus) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.SelectStatus);
    } else if ((parseInt(formValue.triggerRole) == 0 || formValue.triggerRole == '0') && formValue.employeeStatus) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.SelectRole);
    } else if ((parseInt(formValue.manager) == 0) && parseInt(formValue.triggerRole) !== 4) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.SelectManager);
    } else if (!formValue.inTime) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.InTime);
    } else if (!formValue.outTime) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.OutTime);
    } else if (!alphabaticWithSpaceFormat.test(formValue.locationName)) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.LocationName);
    } else if (!this.AddEmployeeForm.get('dateInPosition').valid && formValue.dateInPosition !== null) {
      if (this.maxDate < formValue.dateInPosition) {
        this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.DateNotBeFuture);
      } else {
        this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.DateInPositionFormat);
        this.AddEmployeeForm.get('dateInPosition').reset();
      }
    } else if (!this.AddEmployeeForm.get('dateOfLastSalaryIncrease').valid && formValue.dateOfLastSalaryIncrease !== null) {
      if (this.maxDate < formValue.dateOfLastSalaryIncrease) {
        this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.DateNotBeFuture);
      } else {
        this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.DateOfLastSalaryIncreaseFormat);
        this.AddEmployeeForm.get('dateOfLastSalaryIncrease').reset();
      }
    } else if (!this.AddEmployeeForm.get('dateOfBirth').valid && formValue.dateOfBirth !== null) {
      if (this.maxDate < formValue.dateOfBirth) {
        this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.DateNotBeFuture);
      } else {
        this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.DateFormat);
        this.AddEmployeeForm.get('dateOfBirth').reset();
      }
    } else if (new Date(formValue.dateOfHire) >= new Date(formValue.dateInPosition) && formValue.dateInPosition !== null) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.DateInPositionInvalid);
    } else if (new Date(formValue.dateOfHire) >= new Date(formValue.dateOfLastSalaryIncrease) && formValue.dateOfLastSalaryIncrease !== null) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.LastSalaryIncreaseInvalid);
    } else if (new Date(formValue.dateInPosition) > new Date(formValue.dateOfLastSalaryIncrease) && formValue.dateOfLastSalaryIncrease !== null && formValue.dateInPosition !== null) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.DateOfLAsrIncreaseSalaryInvalid);
    } else if (new Date(formValue.dateOfHire) <= new Date(formValue.dateOfBirth) && formValue.dateOfBirth !== null) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.DateOfBirthInvalid);
    } else if (this.isRegionfieldMandatory && parseInt(this.AddEmployeeForm.value.region) === 0) {
      this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.SelectRegion);
      return;
    } else {
      return true;
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 12-03-2019
   * Description : onChange event for department dropdown.
   */
  onClickAddNewDept(value: string): void {
    if (value === 'addNewDepartment') {
      this.openModalDept();
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 12-03-2019
   * Description : Open modal popup for add department on click Add New Department in department dropdown.
   */
  openModalDept(title: string = DepartmentModel.AddDepartment, value: string = DepartmentModel.Add, id: number = 0): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(AddEditDepartmentComponent, {
      panelClass: modalBackground,
      data: {
        clientId: this.userData.clientId,
        buttonValue: value,
        modalTitle: title,
        departmentName: '',
        departmentId: id
      },
      width: '300px',
    });
    dialogRef.beforeClose().subscribe(department => {
      if (department) {
        this.getDepartmentByClientId();
      }
      this.AddEmployeeForm.get('departmentName').setValue('0');
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  17-04-2019
   * Description : Create event for disabled emailaddress & triggerRole while employeeStatus is inactive
   */
  public onSelectInactive(id: string): void {
    if (this.employeeId > 0) {
      if (parseInt(id) !== 1) {
        this.isEmployeeInactive = true;
        this.employeeData.empStatus = parseInt(id);
        this.AddEmployeeForm.get('emailAddress').setValue(this.employeeData.email);
        this.AddEmployeeForm.get('triggerRole').setValue(this.employeeData.roleId);
        this.AddEmployeeForm.get('manager').setValue(this.employeeData.managerId);
        this.changeTriggerRole();
      } else {
        this.isEmployeeInactive = false;
      }
    }
  }

  public onClickOpenCountryCode(e): void {
    this.AddEmployeeForm.get('callingCode').patchValue(e);

    let dropdownClassName = this.isDarkTheme ? 'material-pagination-dropdown-dark' : 'material-pagination-dropdown-white'
    var parentElement = document.getElementsByClassName('mat-select-panel example-panel')[0];
    if (parentElement) { parentElement.classList.add(dropdownClassName) };
  }

  public getCountryCode() {
    this.commonService.getCountryCode().subscribe(
      (items: any) => {
        this.countryCodeList = items;
        this.cdr.detectChanges();
      });
  }
}