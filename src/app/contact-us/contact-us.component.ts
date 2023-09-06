/**
@author : Anjali Tandel
@class : ContactUsComponent
@description : ContactUsComponent is Created for Contact-us
**/
import { Component, OnInit } from '@angular/core';
import { ContactUsModel, fieldValidator, IgnoreSpaceInitial } from './contact-us-model';
import { LoaderService } from '../core/loader/loader.service';
import { GlobalResponseHandlerService } from '../core/global-response-handler/global-response-handler';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomFieldValidation } from '../shared/Validation/field-validation';
import { ContactUsHeader } from '../shared/tooltip/tooltip-model';
import { Error_Input_class } from '../core/magic-string/common.model';
import { ContactUsService } from './contact-us-service/contact-us.service';
import { UserModel } from '../core/model/user';

@Component({
  selector: 'trigger-contact-us',
  templateUrl: './contact-us.component.html'
})
export class ContactUsComponent implements OnInit {
  /** user created for store login user's detail */
  public user: UserModel;
  /** created field form */
  public contactUsForm: FormGroup;
  /** created pageTitle fo store Page title anf value will be used in tooltip */
  public pageTitle: string;
  /** isDisplayError boolean vaiable is used for display error-message */
  public isDisplayError: boolean;
  /** contactUsModel is used for bind data on contact-us API */
  public contactUsModel = new ContactUsModel();
  public commentsErrorClass: string;
  public isSendBtnDisabled: boolean;
  constructor(
    private loaderService: LoaderService,
    private contactUsService: ContactUsService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private formBuilder: FormBuilder,
    private customFieldValidation: CustomFieldValidation,) {
    this.pageTitle = ContactUsHeader
    this.getUser();
  }

  ngOnInit() {
    this.createForm();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 10-06-2019
   * Description : Get user informtaion.
   */
  public getUser(): void {
    this.user = this.globalResponseHandlerService.getUser();
    this.contactUsModel.fullName = this.user.firstName + ' ' + this.user.lastName;
    this.contactUsModel.email = this.user.email;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 10-06-2019
   * Description : Create form and bind in HTML.
   */
  public createForm(): void {
    this.contactUsForm = this.formBuilder.group({
      subject: ['', Validators.required],
      comments: ['', Validators.required],
    })
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 10-06-2019
   * Description : Event for on click event send button.
   */
  public onClickSendBtn(): void {
    this.isSendBtnDisabled = true;
    if (!this.checkValidationOnSubmit()) {
      this.contactUs();
    } else {
      this.isSendBtnDisabled = false;
    }
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date : 10-06-2019
  * Description : Event for check field-validation and bind data on model.
  */
  public checkValidationOnSubmit(): boolean {
    this.isDisplayError = false;
    Object.keys(this.contactUsForm.controls).forEach(key => {
      const keyValue = this.contactUsForm.value[key];
      let control = fieldValidator.filter(field => (field.key) === key).map(x => x)[0];
      if (control) {
        control.value = keyValue;
        if ((!control.value || control.value === '') && control.isMandatory) {
          this.isDisplayError = this.customFieldValidation.enterFieldValidation(control, this.contactUsForm, this.isDisplayError);
        } else {
          this.isDisplayError = this.customFieldValidation.checkInvalidFieldValidation(control, this.contactUsForm, this.isDisplayError);
        }

        if (keyValue) {
          this.contactUsModel[key] = keyValue.trim();
        }
      }
    });
    return this.isDisplayError;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 10-06-2019
   * Description : Event for bind class dynamic on ngclass attribute.
   */
  public isFieldValid(field: string): string {
    let ngClass: string = '';
    if ((this.contactUsForm.get(field).touched || this.contactUsForm.get(field).dirty) && this.contactUsForm.get(field).invalid) {
      ngClass = Error_Input_class;
    }
    return ngClass;
  }

  public onTouched(field: string): void {
    this.commentsErrorClass = '';
    if (this.contactUsForm.get(field).invalid) {
      this.commentsErrorClass = Error_Input_class;
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 10-06-2019
   * Description : Event for ignore white-space on first character.
   */
  public IgnoreSpace(event: any): void {
    if (event.keyCode === 13) {
      this.checkValidationOnSubmit();
      if (!this.isDisplayError) {
        this.isDisplayError = true;
      }
    }
    if (((event.keyCode === 32 && event.keyCode !== 9) || (event.keyCode === 13)) && event.target.selectionStart === 0) {
      event.preventDefault();
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 10-06-2019
   * Description : Event for on paste and check validation for pattern.
   */
  public onPaste(field: string, event: any): void {
    let keyValue: string = event.clipboardData.getData('Text');
    if (!IgnoreSpaceInitial.test(keyValue)) {
      event.preventDefault();
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 10-06-2019
   * Description : Create function for call API of contact us.
   */
  public contactUs(): void {
    this.loaderService.emitIsLoaderShown(true);
    this.contactUsService.contactUs(this.contactUsModel).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response)) {
          this.contactUsForm.reset();
        }
        this.isSendBtnDisabled = false;
      }
    );
  }
}
