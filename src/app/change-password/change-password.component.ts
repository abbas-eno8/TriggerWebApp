/**
@author : Anjali Tandel
@class : ChangePasswordComponent
@description :ChangePasswordComponent is Created for change password functionality
**/
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
// ........................................//
import { AuthenticationService } from '../core/authentication.service';
import { LoaderService } from '../core/loader/loader.service';
import { GlobalEventsManager } from '../core/navbar/globalEventsManager';
import { AuthService } from '../core/auth/auth.service';
import { CustomValidation } from '../shared/Validation/custom.validation';
import { GlobalResponseHandlerService } from '../core/global-response-handler/global-response-handler';
import { ChangePasswordModel } from './change-password-model';
import { Error_Type, Error_Title } from '../core/magic-string/common.model';
import { ChangePasswordPageTitle } from '../shared/tooltip/tooltip-model';

@Component({
  selector: 'trigger-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup
  public pageTitle: string;
  constructor(
    private formBuilder: FormBuilder,
    private toasterService: ToasterService,
    private authenticationService: AuthenticationService,
    private loaderService: LoaderService,
    private authService: AuthService,
    private globalEventsManager: GlobalEventsManager,
    private customValidation: CustomValidation,
    private globalResponseHandlerService: GlobalResponseHandlerService
  ) {
    this.pageTitle = ChangePasswordPageTitle
   }

  ngOnInit() {
    this.resetChangePasswordForm();
  }

 
  /**
   * Author : Sonal Patil
   * Modified-Date :  21-12-2018
   * Description : For go back to Login page  :
   */
  goToLogin() {
    this.globalEventsManager.showNavBar(false);
    this.authService.startSignoutMainWindow();
  }

  /**
   * Author : Sonal Patil
   * Modified-Date :  21-12-2018
   * Description : Ignore first white space
   */
  avoidBlankSpace(event: any) {
    this.customValidation.validatePassword(event);
  }

  /**
   * Author : Sonal Patil
   * Modified-Date :  20-12-2018
   * Description : For creating formGroup object
   */
  resetChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(8)]],
    })
  }
 
  /**
   * Author : Sonal Patil
   * Modified-Date :  20-12-2018
   * Description : For change password validation
   */
  validateChangePassword() {
    let currentPassword = this.changePasswordForm.get('currentPassword').value + '';
    let password = this.changePasswordForm.get('newPassword').value + '';
    let confirmPassword = this.changePasswordForm.get('confirmNewPassword').value + '';
    let currentPasswordLength = currentPassword.trim().length;
    let passwordLength = password.trim().length;
    if (!this.changePasswordForm.value.currentPassword) {
      this.toasterError(ChangePasswordModel.EnterCurrentPassword);
      return;
    }
    else if (currentPasswordLength < 8) {
      this.toasterError(ChangePasswordModel.CurrentPasswordInvalid);
      return;
    }
    else if (!this.changePasswordForm.value.newPassword) {
      this.toasterError(ChangePasswordModel.EnterNewPassword);
      return;
    }
    else if (this.changePasswordForm.value.newPassword.length < 10) {
      this.toasterError(ChangePasswordModel.NewPasswordLengthInvalid);
      return;
    }
    else if (!this.changePasswordForm.get('newPassword').valid || passwordLength < 10) {
      this.toasterError(ChangePasswordModel.NewPasswordInvalid);
      return;
    }
    else if (!this.changePasswordForm.value.confirmNewPassword) {
      this.toasterError(ChangePasswordModel.EnterConfirmPassword)
      return;
    }
    else if (password != confirmPassword) {
      this.toasterError(ChangePasswordModel.PasswordNotMatch);
      return;
    }
    return true;
  }

  /**
   * Author : Sonal Patil
   * Modified-Date :  20-12-2018
   * Description : For toaster error message
   */
  toasterError(error) {
    this.toasterService.pop(Error_Type, Error_Title, error);
  }

  /**
   * Author : Sonal Patil
   * Modified-Date :  20-12-2018
   * Description : For hit change password api
   */
  changePassword() {
    if (this.validateChangePassword()) {
      this.loaderService.emitIsLoaderShown(true);
      this.authenticationService.changePassword(this.changePasswordForm.value, this.globalResponseHandlerService.getUser().userId).subscribe(
        (response) => {
          if (this.globalResponseHandlerService.getApiResponse(response)) {
            this.changePasswordForm.reset();
            this.goToLogin();
          }
        }
      );
    }
  }
}
