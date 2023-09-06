/**
  @author : Mihir Patel
  @class : UserProfileComponent
  @description :UserProfileComponent create for Update user profile.
**/
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as _ from 'underscore';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
// -------------------------------------------------------  //
import { ProfileUploadComponent } from './profile-upload/profile-upload.component';
import { TooltiProfileHeader } from '../shared/tooltip/tooltip-model';
import { UserProfileService } from './user-profile-service/user-profile.service';
import { GlobalResponseHandlerService } from '../core/global-response-handler/global-response-handler';
import { CustomValidation } from '../shared/Validation/custom.validation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorMessage, Encryption } from '../core/magic-string/common-validation-model';
import { Error_Type, Error_Title, RouteUrl } from '../core/magic-string/common.model';
import { UserProfileModel, SmsNotificationModel, Verified, Verify, UserProfile, ThemeModel, ContactNumber } from './user-profile-model';
import { LoaderService } from '../core/loader/loader.service';
import { GlobalEventsManager } from '../core/navbar/globalEventsManager';
import { SmsConfirmationService } from './sms-confirmation/sms-confirmation-service/sms-confirmation.service';
import { SmsConfirmationModel } from './sms-confirmation/sms-confirmation-model';
import { EmployeeService } from '../core/services/employee-service/employee.service';
import { ThemeService } from '../core/theme/theme.service';
import { CommonService } from '../core/services/common/common.service';

@Component({
  selector: 'trigger-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  // imageUrl defined for store value of user profile image
  public imageUrl: string;
  // isNewImageInValid varible defined for manage boolean value of uploaded new image is valid or not
  public isNewImageInValid: boolean = false;
  // pageTitle is defined for store value of page title as string
  public pageTitle: string;
  // callingCode is defined for store value of country calling code
  public callingCode: any;
  // userName is defined for store value of user's firstName and lastName with concate both
  public userName: string;
  // profileName is store value of first letter of user's first name and concat with first letter of user's last name, which will show in image container when user don't have uploded image
  public profileName: string;
  // userDetail created for store value of logged in user's information which will get from globalResponseHandlerService.getUserData() method
  public userDetail: any;
  // empId defined for store value of loggedin user's empId which will get from globalResponseHandlerService.getUserData() method
  public empId: number;
  // email defined for store value of loggedin user's email id which will get from globalResponseHandlerService.getUserData() method
  public email: string;
  // userId defined for store value of loggedin user's userId which will get from globalResponseHandlerService.getUserData() method
  public userId: number;
  // profileNumber created for store information of user's phone number
  public profileNumber: string;
  // isSmsNotificationOn defined for manage status of sms notification of user is activate or not
  public isSmsNotificationOn: boolean;
  // isPhoneConfirmed defined for manage status of user's phone number is confirmed or not
  public isPhoneConfirmed: boolean;
  // verifBtnValue defined for button's tile based on verifoed or not
  public verifBtnValue: string;
  // isHideVeirfyButton defined for manage state of verify button show/hide
  public isHideVeirfyButton: boolean;
  // isDisableVerifBtn defined for manage state of verified button is disable or enable
  public isDisableVerifBtn: boolean;
  // userProfile defined for bind data in UserProfile
  public userProfile: UserProfile;
  // Define formgroup
  updateProfileForm: FormGroup;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  public webThemeMode: number;
  public countryCodeList: any[];
  public selected: any;
  constructor(private matDialog: MatDialog,
    private userProfileService: UserProfileService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private employeeService: EmployeeService,
    private customValidation: CustomValidation,
    private formBuilder: FormBuilder,
    private toaster: ToasterService,
    private loaderService: LoaderService,
    private router: Router,
    public smsConfirmationService: SmsConfirmationService,
    private globalEventsManager: GlobalEventsManager,
    private commonService: CommonService,
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef,
  ) {
    // store value and pass title to tooltip header : 
    this.pageTitle = TooltiProfileHeader
    const contactNumber: ContactNumber = new ContactNumber();
    this.selected = contactNumber.callingCode;
    this.loaderService.emitIsLoaderShown(true);
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    })
    this.getCountryCode();

  }

  ngOnInit() {
    this.initializeForm();
  }

  ngOnDestroy() {
    this.themeEmitter.unsubscribe();
  }
  public initializeForm(): void {
    this.createForm();
    this.changeBtnValue(false);
    // Get logged in user data which are set in globalResponseHandlerService.
    let userData = this.globalResponseHandlerService.getUserData();
    this.callingCode = userData.countryCallingCode;
    this.empId = userData.loginEmpId;
    this.userId = userData.userId;
    this.userDetail = userData.employee;
    this.email = this.userDetail.email;
    this.webThemeMode = this.userDetail.webThemeMode;
    this.getCallingCode();
  }

  /**
   * Author : Mihir Patel
   * Modified-Date : 14-05-2019
   * Description : Create form of user profile.
   */
  public createForm(): void {
    this.updateProfileForm = this.formBuilder.group({
      employeeId: ['', [Validators.required]],
      callingCode: [[], [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      workCity: ['', [Validators.required]],
      workState: ['', [Validators.required]],
      workZipcode: ['', [Validators.required]],
      themeStatus: [false],
      inTime: ['', [Validators.required]],
      outTime: ['', [Validators.required]],
    });
  }

  /**
   * Author : Mihir Patel
   * Modified-Date : 14-05-2019
   * Description : Open modal popup for update profile.
   */
  public openProfileUploadModal(): void {
    let modalBackground = this.isDarkTheme ? 'modal-background' : 'modal-white-background';
    const dialogRef = this.matDialog.open(ProfileUploadComponent, {
      width: '500px',
      panelClass: modalBackground
    });
    dialogRef.componentInstance.uploadImage.subscribe((object) => {
      if (object) {
        this.isNewImageInValid = false;
        this.userProfile.empImgPath = object;
        this.imageUrl = object;
        dialogRef.close()
      }
    });
  }

  /**
   * Author : Mihir Patel
   * Modified-Date : 14-05-2019
   * Description : Create method which used in html for checked selected image is valid or not and based on that update status of isNewImageInValid.
   */
  public onErrorNewProfile() {
    this.isNewImageInValid = true;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 14-05-2019
   * Description : Create method which first checked that user has already list of country code and if alredy data available then used them, 
   * if not thet calling api of getCallingcode and used them and save them in session for future used.
   */
  getCallingCode() {
    this.getUserProfile()
    // this.callingCode = this.userDetail.countryCallingCode;
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
    //         this.getUserProfile()
    //       }
    //     }
    //   );
    // } else {
    //   this.getUserProfile()
    // }
  }


  /**
   * Author : Mihir Patel
   * Modified-Date :  15-05-2019
   * Description : Create method for get user profile and bind data in model and setUserProfile, setUserName for update data (Reflect data in topbar).
   */
  public getUserProfile(): void {
    this.userProfileService.getProfile(this.empId).subscribe(
      (getProfileResponse: any) => {
        if (this.globalResponseHandlerService.getApiResponse(getProfileResponse, false, false)) {
          this.userProfile = {
            firstName: getProfileResponse.data.firstName,
            lastName: getProfileResponse.data.lastName,
            phoneNumber: getProfileResponse.data.phoneNumber,
            employeeId: getProfileResponse.data.employeeId,
            empId: getProfileResponse.data.empId,
            workCity: getProfileResponse.data.workCity,
            workState: getProfileResponse.data.workState,
            workZipcode: getProfileResponse.data.workZipcode,
            phoneConfirmed: getProfileResponse.data.phoneConfirmed,
            optForSms: getProfileResponse.data.optForSms,
            empImgPath: getProfileResponse.data.empImgPath,
            themeStatus: getProfileResponse.data.webThemeMode === 2 ? false : true,
            inTime: getProfileResponse.data.inTime,
            outTime: getProfileResponse.data.outTime,
          }
          if (this.webThemeMode !== getProfileResponse.data.webThemeMode) {
            let themeStatus = getProfileResponse.data.webThemeMode === 2 ? false : true;
            this.updateThemeByStatus(themeStatus);
          }
          this.imageUrl = this.userProfile.empImgPath;
          this.profileName = this.userProfile.firstName.charAt(0).toUpperCase() + this.userProfile.lastName.charAt(0).toUpperCase();
          this.userName = this.userProfile.firstName + ' ' + this.userProfile.lastName;
          this.globalResponseHandlerService.setUserProfile(this.userProfile.empImgPath);
          this.globalResponseHandlerService.setUserName(this.userProfile.firstName, this.userProfile.lastName);
          this.isPhoneConfirmed = this.userProfile.phoneConfirmed;
          this.profileNumber = this.userProfile.phoneNumber;
          this.globalResponseHandlerService.setPhoneNumber(this.profileNumber);
          if (this.profileNumber === '') {
            this.isHideVeirfyButton = true
          } else {
            this.isHideVeirfyButton = false
            this.changeBtnValue(this.isPhoneConfirmed);
          }
          this.isSmsNotificationOn = this.userProfile.optForSms;
          this.bindData(this.userProfile)
          this.loaderService.emitIsLoaderShown(false);
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 14-05-2019
   * Description : Create method which first checked that user's phone number is verified or not and based on that update button title.
   */
  public changeBtnValue(isVerified: boolean): void {
    if (isVerified) {
      this.verifBtnValue = Verified;
    } else {
      this.verifBtnValue = Verify;
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 14-05-2019
   * Description : Create method for split phone number and bind them in object.
   */
  public bindData(object): void {
    let obj = this.employeeService.splitContactNumber(object.phoneNumber)
    object.callingCode = obj.callingCode
    object.phoneNumber = obj.phoneNumber
    this.selected = object.callingCode;
    this.updateProfileForm.get('callingCode').patchValue(object.callingCode);
    this.patchValue(object)
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 14-05-2019
   * Description : Create method for patch value in update profile form
   */
  patchValue(value: { [key: string]: any }): void {
    Object.keys(value).forEach(key => {
      if (this.updateProfileForm.controls[key]) {
        this.updateProfileForm.controls[key].patchValue(value[key]);
      }
    });
  }

  /**
  * Author : Anjali Tandel
  *  Modified-By : Mihir Patel
  * Modified-Date : 14-05-2019
  * Description : Create method for update profile, first check and validate form and if correct data inserted then make server call for update user profile
  */
  public updateProfile(): void {
    if (this.validateAdminForm()) {
      this.loaderService.emitIsLoaderShown(true);
      let profileModel = this.bindModel();
      this.userProfileService.updateUserProfile(this.userId, profileModel).subscribe(
        (updateUserProfileRsponse) => {
          if (this.globalResponseHandlerService.getApiResponse(updateUserProfileRsponse, true, true)) {
            let updatedNumber = updateUserProfileRsponse['data']['phoneNumber'];
            if (updatedNumber !== this.profileNumber) {
              this.profileNumber = updatedNumber
              this.isHideVeirfyButton = this.profileNumber.length < 9 ? true : false
              this.globalResponseHandlerService.setPhoneNumber(this.profileNumber);
              this.isPhoneConfirmed = updateUserProfileRsponse['data']['phoneConfirmed'];
              this.isSmsNotificationOn = updateUserProfileRsponse['data']['optForSms'];
              this.changeBtnValue(this.isPhoneConfirmed);
            }
          }
        }
      );
    }
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 16-05-2019
   * Description : Created method for bind modal for transfer data to the API call.
   */
  public bindModel(): UserProfileModel {
    let userProfileModel = new UserProfileModel();
    Object.keys(this.updateProfileForm.controls).forEach(key => {
      const keyValue = this.updateProfileForm.get(key).value;
      if (keyValue) {
        if (isNaN(keyValue)) {
          userProfileModel[key] = keyValue.trim();
        } else {
          userProfileModel[key] = keyValue;
        }
      }
    });
    userProfileModel.updatedBy = this.userId;
    userProfileModel.empId = this.empId;
    let phoneNumber = this.updateProfileForm.value.callingCode + ' ' + this.updateProfileForm.value.phoneNumber;
    if (phoneNumber.length > 9) {
      userProfileModel.phoneNumber = this.updateProfileForm.value.callingCode + ' ' + this.updateProfileForm.value.phoneNumber;
    } else {
      userProfileModel.phoneNumber = '';
    }
    return userProfileModel
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  24-05-2019
   * Description : Create function for call API for change SMS notification.
   */
  changeSmsNotification(checked: boolean): void {
    this.loaderService.emitIsLoaderShown(true);
    this.isSmsNotificationOn = checked;
    let smsNotificatiobObject = new SmsNotificationModel();
    smsNotificatiobObject.empId = this.empId;
    smsNotificatiobObject.optForSms = this.isSmsNotificationOn;
    smsNotificatiobObject.updatedBy = this.userId;
    this.userProfileService.allowSmsNotification(this.userId, smsNotificatiobObject).subscribe(
      (smsNotificationRsponse) => {
        if (!this.globalResponseHandlerService.getApiResponse(smsNotificationRsponse, false, true)) {
          this.isSmsNotificationOn = false;
        }
      });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  24-05-2019
   * Description : Create function which is checked that phone number is valid or not and if enter valid phone number, call method of send code.
   */
  redirectToSmsConfirmtaion() {
    if (this.updateProfileForm.value.phoneNumber === '') {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.ClientPhoneNumber);
    } else if (this.updateProfileForm.value.phoneNumber.length < 7 || this.updateProfileForm.value.phoneNumber.length > 15) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.ClientPhoneNumberInvalid);
    } else {
      this.sendCode();
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  24-05-2019
   * Description : Create function for call API for resend code to registerd phone-number and redirect to sms-confirmation route for verify mobile number.
   */
  public sendCode(): void {
    this.isPhoneConfirmed = true;
    this.loaderService.emitIsLoaderShown(true);
    let sendSms = new SmsConfirmationModel();
    sendSms.email = this.email;
    sendSms.empId = this.empId;
    sendSms.phoneNumber = this.updateProfileForm.value.callingCode + ' ' + this.updateProfileForm.value.phoneNumber;
    sendSms.createdBy = this.userId;
    this.smsConfirmationService.sendCode(sendSms).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, true, true)) {
          if (response) {
            this.router.navigate([RouteUrl.SmsConfirmationRoute]);
            this.globalEventsManager.showSmsVerificationPage(true);
          }
        } else {
          this.isPhoneConfirmed = false;
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  24-05-2019
   * Description : Create Method for validate fields of user profile.
   */
  validateAdminForm() {
    var alphabaticWithSpaceFormat = /^[a-zA-Z\'\s]*$/;
    if (this.updateProfileForm.value.phoneNumber !== '' && !this.updateProfileForm.get('phoneNumber').valid) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.ClientPhoneNumberInvalid);
      return;
    } else if (!this.updateProfileForm.value.workCity || !this.updateProfileForm.value.workCity.replace(/\s/g, '').length) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.ClientCity);
      return;
    } else if (!this.updateProfileForm.get('workCity').valid || !isNaN(this.updateProfileForm.value.workCity) || !alphabaticWithSpaceFormat.test(this.updateProfileForm.value.workCity)) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.ClientCityInvalid);
      return;
    } else if (this.updateProfileForm.value.workCity.length > 30) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.CityInvalidLength);
      return;
    } else if (!this.updateProfileForm.value.workState || !this.updateProfileForm.value.workState.replace(/\s/g, '').length) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.ClientState);
      return;
    } else if (!this.updateProfileForm.get('workState').valid || !isNaN(this.updateProfileForm.value.workState) || !alphabaticWithSpaceFormat.test(this.updateProfileForm.value.workState)) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.ClientStateInvalid);
      return;
    } else if (this.updateProfileForm.value.workState.length > 25) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.ClientStateInvalidLength);
      return;
    } else if (!this.updateProfileForm.value.workZipcode) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.ClientZip);
    } else if (!this.updateProfileForm.get('workZipcode').valid) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.ClientZipInvalid);
    } else if (this.updateProfileForm.value.workZipcode.length < 5 || this.updateProfileForm.value.workZipcode.length > 15 || this.updateProfileForm.value.workZipcode.replace(/\s/g, '').length < 5) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.ClientZipInvalidLength);
    } else if (!this.updateProfileForm.value.inTime) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.InTime);
    } else if (!this.updateProfileForm.value.outTime) {
      this.toaster.pop(Error_Type, Error_Title, ErrorMessage.OutTime);
    } else {
      return true;
    }
  }

  //  validation method for number oly and used in validate phone number
  phoneNumberValidation(event: any) {
    this.customValidation.phoneNumberOnly(event);
  }

  // Allow paste only numeric value
  public pasteOnlyNumericEvent($event: any) {
    this.customValidation.pasteOnlyNumericEvent(event);
  }

  // Accept only numeric value
  zipcodeValidation(event: any) {
    this.customValidation.zipcodeValidation(event);
    this.avoidBlankSpace(event);
  }

  // Ignore first white space
  avoidBlankSpace(event: any) {
    this.customValidation.avoidBlankSpace(event);
  }

  // Accept only alphabatic value
  AlphabaticharOnly(event: any) {
    this.customValidation.AlphabaticharOnly(event);
    this.avoidBlankSpace(event);
  }

  // paste the alphabatic value
  public pasteOnlyAlphabaticEvent($event: any) {
    this.customValidation.pasteOnlyAlphabaticEvent(event);
  }

  public onClickOpenCountryCode(e): void {
    this.updateProfileForm.get('callingCode').patchValue(e);
    let dropdownClassName = this.isDarkTheme ? 'material-pagination-dropdown-dark' : 'material-pagination-dropdown-white'
    var parentElement = document.getElementsByClassName('mat-select-panel userProfile')[0];
    if (parentElement) { parentElement.classList.add(dropdownClassName) };
  }

  switchTheme() {
    this.loaderService.emitIsLoaderShown(true);
    let status: number = this.updateProfileForm.value.themeStatus ? 3 : 2;
    let updateThemeBody = new ThemeModel();
    updateThemeBody.WebThemeMode = status;
    this.userProfileService.updateTheme(this.empId, updateThemeBody).subscribe(
      (updateThemeRsponse) => {
        if (this.globalResponseHandlerService.getApiResponse(updateThemeRsponse, false, true)) {
          this.updateThemeByStatus(this.updateProfileForm.value.themeStatus);
          this.globalResponseHandlerService.setTheme(status);
        }
      });
  }

  updateThemeByStatus(status) {
    if (status) {
      this.themeService.setTheme('dark');
      this.globalEventsManager.updateThemeType(true);
    } else {
      this.themeService.setTheme('light');
      this.globalEventsManager.updateThemeType(false);
    }
  }

  public getCountryCode() {
    this.commonService.getCountryCode().subscribe(
      (items: any) => {
        this.countryCodeList = items;
        this.cdr.detectChanges();
      });
  }
}