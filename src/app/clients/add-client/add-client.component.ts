/**
 * description :AddClientComponent is created for add client.
 * @author : Anjali Tandel
 * @class : AddClientComponent
 */
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//  ................................................ //
import { ClientModel, AddClient, EditClient, ClientProfile, OrganizationType, WorkLocation } from '../client-model';
import { CropImageComponent } from '../../shared/modal-popup/crop-image/crop-image.component';
import { CustomValidation } from '../../shared/Validation/custom.validation';
import { ErrorMessage, Image } from '../../core/magic-string/common-validation-model';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { MatDialog } from '@angular/material';
import { RoleEnum, Route, False } from '../../core/magic-string/common.model';
//import * as _ from 'underscore';
import { ClientService } from '../client-service/client.service';
import { UrlEncryptionDecryptionService } from '../../core/url-encryption-decryption/url-encryption-decryption.service';
import { CustomFieldValidation } from '../../shared/Validation/field-validation';
import { GlobalEventsManager } from '../../core/navbar/globalEventsManager';
import { AddClientService } from './add-client-service/add-client.service';
import { SortByFieldService } from '../../core/services/sort-by-field/sort-by-field.service';

@Component({
  selector: 'trigger-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  private defaultWorkLocations: WorkLocation[];
  /** pageTitle created for store title of page and bind in html */
  public pageTitle: string;
  /** user created for store login user's detail */
  public user: any;
  /** iconName created for image icon name while change client-logo and send to the API */
  private iconName: string = '';
  /** iconName created for image url while change client-logo and send to the API */
  private url: string;
  /** clientId created for store client id */
  public clientId: number;
  /** iconUrl created for image url while change client-logo and send to the API */
  public iconUrl: string = '';
  /** industryTypes created for store industry list from api response. */
  public industryTypes: any;
  /** userRole created for store user-role. */
  public userRole: string;
  /** set boolean value as true if role is admin. */
  public isAdmin: boolean;
  /** set boolean value as true if role is TriggerAdmin. */
  public isTriggerAdmin: boolean;
  /** mask created for added validation for cost per employee & fixed amount per month. */
  mask: any[] = ['$', ' ', /[1-9]/, ',', /\d/, /\d/, /\d/, '.', /\d/, /\d/];
  numberMask = createNumberMask({
    prefix: '$ ',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    allowDecimal: true,
    allowNegative: false,
    allowLeadingZeroes: false,
    integerLimit: 5,
  })
  bsValue = new Date();
  minDate: Date;
  maxDate: Date;
  minEndDate: Date;
  /** _searchText created for store search text */
  addClientForm: FormGroup
  public organizationTypeList: OrganizationType[];
  public isDisplayCallbackUrl: boolean;
  public isAzureProvider: boolean;
  public companyData: any;
  public mobileExternalProvider: any;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  public themeClass: string;
  public isAddClient: boolean;
  constructor(
    private clientService: ClientService,
    private customValidation: CustomValidation,
    private customFieldValidation: CustomFieldValidation,
    private formBuilder: FormBuilder,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService,
    private globalEventsManager: GlobalEventsManager,
    private sortByFieldService: SortByFieldService,
    private router: Router,
  ) {
    this.getUser();
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minEndDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate());
    this.minEndDate.setDate(this.minEndDate.getDate() + 1);
    this.defaultWorkLocations = [];
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
        this.themeClass = 'theme-dark'
      } else {
        this.isDarkTheme = false;
        this.themeClass = 'theme-default'
      }
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  27-03-2019
   * Description : Initialize varibales & call method on page load
   */
  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }

  getUser() {
    this.user = this.globalResponseHandlerService.getUserData();
    this.userRole = this.user.userRole;
    this.clientId = this.user.clientId;

    let encryptedKey = this.activatedRoute.snapshot.queryParams['id'];
    this.clientId = encryptedKey ? parseInt(this.urlEncryptionDecryptionService.urlDecryption(encryptedKey)) : 0;

    if (this.clientId > 0) {
      this.pageTitle = EditClient;
      this.isAddClient = false;
    } else {
      this.pageTitle = AddClient;
      this.isDisplayCallbackUrl = false;
      this.isAzureProvider = false;
      this.isAddClient = true;
    }

    if (this.userRole === RoleEnum.Admin) {
      this.pageTitle = ClientProfile;
      this.isAdmin = true;
    }

    if (this.userRole === RoleEnum.TriggerAdmin) {
      this.isTriggerAdmin = true;
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : Create function for initialize form values in add-client & bind value on edit-client
   */
  public initializeForm(): void {
    this.createForm();
    this.globalResponseHandlerService.displayLoader(true);
    if (this.clientId > 0) {
      this.getClientById();
    } else {
      this.getIndustryType();
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : Method is created for create new form of add-client form
   */
  public createForm(): void {
    this.addClientForm = this.formBuilder.group({
      companyId: ['', [Validators.required]],
      industryTypeId: ['0', [Validators.required]],
      companyName: ['', [Validators.required]],
      address1: ['', [Validators.required]],
      address2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      country: ['', [Validators.required]],
      dealsRemarks: [''],
      remarks: [''],
      phoneNo1: ['', [Validators.required]],
      website: [''],
      costPerEmp: [],
      keyempemail: [],
      fixedAmtPerMon: [],
      contractEndDate: ['', [Validators.required]],
      contractStartDate: [new Date(), [Validators.required]],
      gracePeriod: [30, [Validators.required]],
      inActivityDays: [0],
      reminderDays: [0],
      organizationTypeId: [0],
      //workLocation: [0],
      isWorkLocationMandatory: [False],
      isUpdateSurveyMandatory: [False],
      externalProviderType: [0],
      providerClientId: ['', [Validators.required]],
      providerTenantId: ['', [Validators.required]],
      applicationName: ['', [Validators.required]],
      webCallBack: ['', [Validators.required]],
      // androidCallBack: ['', [Validators.required]],
      // iosCallBack: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : Get industry dropdown list, industries are get from api call
   */
  public getIndustryType(): void {
    this.clientService.getIndustryType().subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
          //this.industryTypes = _.sortBy(response.data, 'industryType');
          this.industryTypes = this.sortByFieldService.sortByField(response.data, 'industryType');
          this.getOrganizationType();
        }
      }
    );
  }

  /**
  * Author : Mihir Patel
  * Created-Date :  19-09-2019
  * Descriotion : Method for get all organization type from master table and bind into dropdown.
  */
  getOrganizationType(): void {
    this.clientService.getOrgType().subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response)) {
          this.organizationTypeList = [];
          this.organizationTypeList = response.data.map((object) => ({
            organizationType: object.organizationType,
            organizationTypeId: object.organizationTypeId
          }));
        }
      }
    );
  }


  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : Get client by client id from api call
   */
  public getClientById(): void {
    this.clientService.getClientById(this.clientId).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
          if (response.data[0]) {
            this.iconUrl = response.data[0].compImgPath;
            this.setLogo(this.iconUrl)
            this.getIndustryType();
            this.bindData(response.data[0])
            // this.bindData(data)
          }
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  26-12-2018
   * Description : Bind data for edit client in form
   */
  public bindData(object): void {
    this.companyData = object
    object.isWorkLocationMandatory = object.isWorkLocationMandatory + '';
    object.isUpdateSurveyMandatory = object.isUpdateSurveyMandatory + '';
    object.contractEndDate = object.contractEndDate === '1900-01-01T00:00:00' ? null : new Date(object.contractEndDate);
    object.contractStartDate = object.contractStartDate == '1900-01-01T00:00:000' ? null : new Date(object.contractStartDate);
    this.isAzureProvider = object.externalProviderType === 2 ? true : false;
    this.isDisplayCallbackUrl = this.isAzureProvider ? true : false;
    if (this.isAzureProvider) {
      this.mobileExternalProvider = object.mobileExternalProvider;
    }
    this.patchValue(object)
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  26-12-2018
   * Description : patch data in add-client form
   */
  patchValue(value: { [key: string]: any }): void {
    Object.keys(value).forEach(key => {
      if (this.addClientForm.controls[key]) {
        this.addClientForm.controls[key].patchValue(value[key]);
      }
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : Click event on submit button to perform add-edit action
   */
  public onClickSubmitBtn(): void {
    if (this.clientFormValidation(this.addClientForm.value)) {
      let clientModel = this.bindModel();
      clientModel.defaultWorkLocations = this.defaultWorkLocations;
      this.globalResponseHandlerService.displayLoader(true);
      if (this.clientId === 0) {
        clientModel.createdby = this.user.userId;
        this.clientService.addClient(clientModel).subscribe(
          (response) => {
            if (this.globalResponseHandlerService.getApiResponse(response)) {
              this.router.navigate([Route.Client]);
            }
          }
        );
      } else {
        if (this.url) {
          clientModel.compImgPath = this.iconName;
          clientModel.compImage = this.url;
        }
        clientModel.updatedby = this.user.userId;
        this.clientService.updateClient(clientModel).subscribe(
          (response) => {
            if (this.globalResponseHandlerService.getApiResponse(response)) {
              if (response.data[0].compImgPath !== '' && this.url) {
                let setIconUrl = response.data[0].compImgPath;
                this.iconUrl = setIconUrl;
                this.setLogo(setIconUrl)
              }
              this.url = '';
              if (this.userRole === RoleEnum.TriggerAdmin)
                this.router.navigate([Route.Client]);
            }
          }
        );
      }
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 18-03-2019
   * Description : Created method for bind modal for transfer data to the API call.
   */
  public bindModel(): ClientModel {
    let clientModel = new ClientModel();
    Object.keys(this.addClientForm.controls).forEach(key => {
      const keyValue = this.addClientForm.get(key).value;
      if (keyValue) {
        if (isNaN(keyValue)) {
          clientModel[key] = keyValue.trim();
        } else {
          clientModel[key] = keyValue;
        }
      }
    });
    clientModel.compId = this.clientId;
    clientModel.externalProviderId = this.companyData ? this.companyData.externalProviderId : 0;
    clientModel.contractStartDate = this.customValidation.changeDateFormat(clientModel.contractStartDate);
    clientModel.contractEndDate = this.customValidation.changeDateFormat(clientModel.contractEndDate);
    return clientModel
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : Event for set image icon URL
   */
  public setLogo(url: string): void {
    this.globalResponseHandlerService.setPartialClientResponse(this.user.clientId, '', false, url)
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 18-03-2019
   * Description : Open modal popup for update client-logo.
   */
  public openModal(): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(CropImageComponent, {
      width: '500px',
      panelClass: modalBackground
    });
    dialogRef.componentInstance.uploadImage.subscribe((object) => {
      if (object) {
        this.url = object.iconUrl;
        this.iconUrl = object.image;
        this.iconName = object.iconName;
        dialogRef.close()
      }
    });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : paste event for paste only numeric value which is used in phone number, zipcodem grace-period & assessment days.
   */
  public pasteOnlyNumericEvent($event: any): void {
    this.customValidation.pasteOnlyNumericEvent(event);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : paste event for paste only alphabatic value which is used in city, state & country.
   */
  public pasteOnlyAlphabaticEvent($event: any): void {
    this.customValidation.pasteOnlyAlphabaticEvent(event);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : keypress event for allow only numeric value which is used in phone number, zipcodem grace-period & assessment days.
   */
  public numberOnly(event: any, text: string): void {
    this.customValidation.numberOnly(event);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : keypress event validation for zipcode.
   */
  public zipcodeValidation(event: any): void {
    this.customValidation.zipcodeValidation(event);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : keypress event for allow only alphabatic value which is used in city, state & country.
   */
  public AlphabaticharOnly(event: any, text: string): void {
    this.customValidation.AlphabaticharOnly(event);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : keypress event for ignore first white space.
   */
  public avoidBlankSpace(event: any): void {
    this.customValidation.avoidBlankSpace(event);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : keypress event for ignore first white space.
   */
  public addressValidation(event: any): void {
    this.customValidation.addressValidation(event);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : keypress event for phone-number validation.
   */
  phoneNumberValidation(event: any) {
    this.customValidation.phoneNumberOnly(event);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  30-03-20189
   * Descriotion : keypress event validation for clien name, accept only alphanumeric value and (-) & (.).
   */
  public clientNameValidation(event: any): void {
    const pattern = /^$|^[A-Za-z0-9\-\s]+/;
    let inputChar = String.fromCharCode(event.charCode);

    if (event.keyCode === 32 && event.target.selectionStart === 0 && event.keyCode !== 9) {
      event.preventDefault();
    }
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  30-03-20189
   * Descriotion : Paste event validation for clien name, accept only alphanumeric value and (-) & (.).
   */
  public clientNameValidationOnPaste(value: string): void {
    const pattern = /^$|^[A-Za-z0-9\-.\s]+/;
    if (!pattern.test(value)) {
      event.preventDefault();
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  21-12-2018
   * Descriotion : Change event on Contract start date to set Contract end date (end date is bigger than start date).
   */
  public onValueChange(event: any): void {
    if (this.minEndDate < this.minDate)
      this.minEndDate.setDate(event.getDate() + 1);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  18-03-2019
   * Descriotion : Create event while image is corrupted
   */
  public onError(): void {
    this.iconUrl = Image.ClientLogo;
    this.iconName = 'No logo';
  }


  /**
   * Author : Anjali Tandel
   * Modified-Date :  26-12-2018
   * Description : Create function add-edit client form field validation on click submit
   */
  public clientFormValidation(clientForm): boolean {
    let formValue = clientForm;
    let phonenumber = formValue.phoneNo1 + '';
    phonenumber = phonenumber.trim();
    let zip = formValue.zipcode + '';
    zip = zip.trim();
    let client = formValue.companyName + '';
    client = client.trim();
    let numberOnlyRegex = /^\d*$/
    var alphabaticWithSpaceFormat = /^[a-zA-Z ]*$/;
    var alphabaticNumericWithSpaceFormat = /^[a-zA-Z0-9\'\s]+$/i;
    const ClientNamepattern = /^$|^[A-Za-z0-9\-.\s]+/;
    if (!formValue.phoneNo1) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientPhoneNumber);
    } else if (!formValue.phoneNo1 || phonenumber.replace(/\s/g, '').length < 7 ||
      !phonenumber.replace(/\s/g, '').length) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientPhoneNumberInvalid);
    }
   else if (!formValue.companyId && this.clientId > 0 && this.isTriggerAdmin) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientId);
    } else if ((!this.addClientForm.get('companyId').valid) && this.clientId > 0 && this.isTriggerAdmin) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientIdInvalid);
    } else if (client.replace(/\s/g, '').length > 100 && this.isTriggerAdmin) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientIdInvalidLength);
    } else if (!formValue.companyName) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientNameNull);
    } else if (!formValue.companyName.replace(/\s/g, '').length || !ClientNamepattern.test(formValue.companyName)) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientNameInvalid);
    } else if (formValue.industryTypeId === '0') {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientType);
    } else if (!formValue.address1 || !formValue.address1.replace(/\s/g, '').length) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientAddress);
    } else if (!alphabaticNumericWithSpaceFormat.test(formValue.address1)) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientAddress1Invalid);
    } else if (!alphabaticNumericWithSpaceFormat.test(formValue.addressline2) && formValue.addressline2 != '') {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientAddress2Invalid);
    } else if (!formValue.city) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientCity);
    } else if (!isNaN(formValue.city) || !formValue.city.replace(/\s/g, '').length || !alphabaticWithSpaceFormat.test(formValue.city)) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientCityInvalid);
    } else if (!formValue.state) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientState);
    } else if (!isNaN(formValue.state) || !formValue.state.replace(/\s/g, '').length || !alphabaticWithSpaceFormat.test(formValue.state)) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientStateInvalid);
    } else if (!formValue.zipcode) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientZip);
    } else if (formValue.zipcode.length < 5 || formValue.zipcode.length > 15 || zip.replace(/\s/g, '').length < 5 || !zip.replace(/\s/g, '').length) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientZipInvalid);
    } else if (!formValue.country) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientCountry);
    } else if (!isNaN(formValue.country) || !formValue.country.replace(/\s/g, '').length || !alphabaticWithSpaceFormat.test(formValue.country)) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientCountryInvalid);
    } else if (!formValue.phoneNo1) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientPhoneNumber);
    } else if (!formValue.phoneNo1 || phonenumber.replace(/\s/g, '').length < 7 || !phonenumber.replace(/\s/g, '').length) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientPhoneNumberInvalid);
    } else if (this.isTriggerAdmin) {
      if (!formValue.contractStartDate) {
        this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientStartDate);
        // } else if (new Date(formValue.contractStartDate) < new Date()) {
        //   this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.DateNotBePast);
        // } else if (new Date(formValue.contractStartDate) < new Date()) {
        //   this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.DateNotBePast);
      } else if (!formValue.contractEndDate) {
        this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientEndDate);
      } else if (new Date(formValue.contractEndDate) <= new Date(formValue.contractStartDate)) {
        this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientEndDateInvalid);
      } else if (formValue.gracePeriod === '') {
        this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientGracePeriod);
      } else if (!numberOnlyRegex.test(formValue.gracePeriod)) {
        this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.GracePeriodInvalid);
      } else if (formValue.gracePeriod > 365) {
        this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientGracePeriodInvalid);
      } else if (!numberOnlyRegex.test(formValue.inActivityDays)) {
        this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientInactivityInvalid);
      } else if (formValue.inActivityDays > 365) {
        this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientInactivityDaysInvalid);
      } else if (!numberOnlyRegex.test(formValue.reminderDays)) {
        this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientReminderInvalid);
      } else if (formValue.reminderDays > 365) {
        this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientReminderDaysInvalid);
      } else if (!this.externalProviderValidation(formValue)) {
        return false;
      } else if (this.isAddClient && this.defaultWorkLocations.length === 0) {
        this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.SelectOrAddWorkLocation);
        return false;
      } else {
        return true;
      }
    } else if (!numberOnlyRegex.test(formValue.inActivityDays)) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientInactivityInvalid);
    } else if (formValue.inActivityDays > 365) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientInactivityDaysInvalid);
    } else if (!numberOnlyRegex.test(formValue.reminderDays)) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientReminderInvalid);
    } else if (formValue.reminderDays > 365) {
      this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.ClientReminderDaysInvalid);
    } else if (!this.externalProviderValidation(formValue)) {
      return false;
    } else {
      return true;
    }
  }

  public externalProviderValidation(formValue): boolean {
    if (this.isAzureProvider) {
      if (!formValue.providerClientId) {
        this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.AzuerProviderClientId);
      } else if (!formValue.providerTenantId) {
        this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.AzuerProviderTenantId);
      } else if (!formValue.applicationName) {
        this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.AzuerApplicationName);
      } else if (!formValue.email) {
        this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.EmailAddress);
      } else if (this.isDisplayCallbackUrl) {
        if (!formValue.webCallBack) {
          this.globalResponseHandlerService.toastergetApiResponse(ErrorMessage.AzuerWebCallBackUrl);
        }
        else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  public isInputValid(field: string): string {
    return this.customFieldValidation.isFieldValid(field, this.addClientForm);
  }

  public isDropdownValid(field: string): string {
    return this.customFieldValidation.isDropdownValid(field, this.addClientForm);
  }

  public onChangeProvider(): void {
    if (this.addClientForm.value.externalProviderType === '2') {
      this.addClientForm.controls['externalProviderType'].patchValue(2);
      this.addClientForm.value.externalProviderType === 2;
    } else if (this.addClientForm.value.externalProviderType === '1') {
      this.addClientForm.controls['externalProviderType'].patchValue(1);
      this.addClientForm.value.externalProviderType === 1;
      if (this.clientId > 0) {
        this.isDisplayCallbackUrl = false;
      }
    } else {
      this.addClientForm.controls['externalProviderType'].patchValue(0);
    }

    this.isAzureProvider = this.addClientForm.value.externalProviderType === 2 ? true : false;
    if (!this.isAzureProvider) {
      this.addClientForm.controls['providerClientId'].patchValue('');
      this.addClientForm.controls['providerTenantId'].patchValue('');
      this.addClientForm.controls['applicationName'].patchValue('');
      this.addClientForm.controls['email'].patchValue('');
      this.addClientForm.controls['webCallBack'].patchValue('');
    }

  }
  // Ignore space when pasting the code
  IgnoreSpace($event: any) {
    this.customValidation.IgnoreSpace(event);
  }

  public getDefaultWorkLocations(workLocation: WorkLocation[]): void {
    this.defaultWorkLocations = this.sortByFieldService.sortByField(workLocation, 'workLocationId');
  }
}