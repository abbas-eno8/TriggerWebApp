/**
@author : Anjali Tandel
@class : SmsConfirmationComponent
@description :SmsConfirmationComponent is created for sms-confirmation using code.
**/
import { Component, OnInit, ViewChild } from '@angular/core';
import { SmsConfirmationService } from './sms-confirmation-service/sms-confirmation.service';
import { SmsConfirmationModel, ActiveClass, CounterStateCompleted, ExceededRequestsMessage, SmsConfirmationInputType, EnabledResendLink } from './sms-confirmation-model';
import { Router } from '@angular/router';

import { CounterComponent } from './counter.component';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { LoaderService } from '../../core/loader/loader.service';
import { SMSVerificationHeader } from '../../shared/tooltip/tooltip-model';
import { RouteUrl } from '../../core/magic-string/common.model';

@Component({
  selector: 'trigger-sms-confirmation',
  templateUrl: './sms-confirmation.component.html'
})
export class SmsConfirmationComponent implements OnInit {
  @ViewChild('counter', { read: CounterComponent, static: true })
  private counter: CounterComponent;
  /** user created for store login user's detail */
  public user: any
  /** pageTitle stored header of sms-confirmaion page */
  public pageTitle: string
  /** isDisableVerifyBtn is boolean value for disable/enable Verify button */
  public isDisableVerifyBtn: boolean
  /** isDisableResendSmsLink is boolean value for disable/enable Resend SMS link */
  public isDisableResendSmsLink: boolean
  /** verificationCode stored final 6 digit code which user enter */
  public verificationCode: string
  /** verifiedCodeObject stored object which we passed to API for verify code */
  public verifiedCodeObject: SmsConfirmationModel
  /** onclickResendLinkCount stored value of count on click resend button */
  public onclickResendLinkCount: number
  /** inputValue is using in in binding Input type, value, class, autofocus, event dynamically in HTML */
  public inputValue: SmsConfirmationInputType[];
  constructor(
    public smsConfirmationService: SmsConfirmationService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    private router: Router) {
    this.pageTitle = SMSVerificationHeader;
    this.isDisableVerifyBtn = true;
    this.isDisableResendSmsLink = true;
    this.onclickResendLinkCount = 0;
    this.verifiedCodeObject = new SmsConfirmationModel();
    this.getUser();
    this.inputValue = [
      { id: 1, value: '', class: ActiveClass, isAutoFocus: true },
      { id: 2, value: '', class: '', isAutoFocus: false },
      { id: 3, value: '', class: '', isAutoFocus: false },
      { id: 4, value: '', class: '', isAutoFocus: false },
      { id: 5, value: '', class: '', isAutoFocus: false },
      { id: 6, value: '', class: '', isAutoFocus: false },
    ]
  }

  ngOnInit(): void { this.startTimer(); }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  24-05-2019
   * Description : Get the user-details
   */
  getUser(): void {
    this.user = this.globalResponseHandlerService.getUserData();
    this.verifiedCodeObject.empId = this.user.loginEmpId;
    this.verifiedCodeObject.email = this.user.employee.email;
    this.verifiedCodeObject.updatedBy = this.user.userId;
    this.verifiedCodeObject.phoneNumber = '';
    this.verificationCode = '';
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  24-05-2019
   * Description : Function for start count-down timer
   */
  public startTimer(): void {
    this.counter.startAt = 120;
    this.counter.counterState.subscribe((time) => {
      this.isDisableVerifyBtn = false;
      if (time === CounterStateCompleted) {
        if (this.onclickResendLinkCount === 2) {
          this.globalResponseHandlerService.disaplySuccessMessage(ExceededRequestsMessage)
          this.router.navigate([RouteUrl.UserProfile]);
        } else {
          this.globalResponseHandlerService.disaplySuccessMessage(EnabledResendLink)
          this.isDisableResendSmsLink = false;
        }
        this.isDisableVerifyBtn = true;
      }
    });
    this.counter.start();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 28-05-2019
   * Description : Create event on input change for handling focus, tab, active
   */
  inputModelChange(element: SmsConfirmationInputType): void {
    const pattern = /[0-9]/;
    if (pattern.test(element.value)) {
      if (element.value != '') {
        let nextId = element.id + 1
        let nextElement = this.inputValue.filter(item => item.id === nextId);
        if (nextElement.length > 0) {
          nextElement[0].isAutoFocus = true
          nextElement[0].class = ActiveClass
        }
        element.isAutoFocus = false
        this.getCode();
      }
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  28-05-2019
   * Description : Create on key-press event for validation.
   */
  public onKeyPress(event: any): void {
    const pattern = /[0-9]/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 28-05-2019
   * Description : Create on key-down with backspace event for validation on backspace key
   */
  public onKeyDownBackSpace(element: SmsConfirmationInputType): void {
    this.inputValue.forEach(item => item.isAutoFocus = false);
    let previousId = (element.id - 1)
    let previousElement = this.inputValue.filter(item => item.id === previousId);
    if (element.value !== '') {
      element.value = ''
      element.isAutoFocus = true;
    } else {
      if (previousElement[0].value === '') {
        element.class = '';
        previousElement[0].isAutoFocus = true;
      } else {
        if (previousId !== 0) {
          previousElement[0].isAutoFocus = true;
        }
        if (previousId > 0) {
          element.class = '';
        }
      }
      previousElement[0].value = '';
    }
    this.getCode();
  }


  /**
   * Author : Anjali Tandel
   * Modified-Date : 28-05-2019
   * Description : Create on key-down with tab event for validation on tab key
   */
  public onKeyDownTab(id: number): void {
    let nextId = (id + 1)
    let nextElement = this.inputValue.filter(item => item.id === nextId);
    nextElement[0].class = ActiveClass
  }

  public onKeyDownEnter(): void {
    if (this.verificationCode.length === 6) {
      this.verify();
    }
  }

  onclick(element: SmsConfirmationInputType): void {
    element.class = ActiveClass
  }
  /**
   * Author : Anjali Tandel
   * Modified-Date : 28-05-2019
   * Description : Create function for get 6 digit code which use enters and call API automatically.
   */
  public getCode(): void {
    let code = this.inputValue.filter(item => item.value !== '').map(key => key.value)
    this.verificationCode = code.join().replace(/[^0-9]/g, '');
    if (this.verificationCode.length === 6 && this.isDisableResendSmsLink) {
      this.inputValue.forEach(item => item.isAutoFocus = false);
      this.isDisableVerifyBtn = false;
      this.verifiedCodeObject.verificationCode = parseInt(this.verificationCode);
    } else {
      this.isDisableVerifyBtn = true;
      this.verifiedCodeObject.verificationCode = 0;
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  24-05-2019
   * Description : Create function for call API for verify 6 digit code which user enters.
   */
  public verify(): void {
    this.loaderService.emitIsLoaderShown(true);
    this.verifiedCodeObject.verificationCode = parseInt(this.verificationCode);
    this.smsConfirmationService.verifyCode(this.verifiedCodeObject).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, true, true)) {
          this.verificationCode = '';
          this.router.navigate([RouteUrl.UserProfile]);
        }
      }
    );
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  24-05-2019
   * Description : Create function for call API for resend code to registerd phone-number.
   */
  public resend(): void {
    this.isDisableResendSmsLink = true;
    this.onclickResendLinkCount += 1;
    this.loaderService.emitIsLoaderShown(true);
    this.inputValue.forEach(item => item.value = '');
    this.inputValue.filter(item => item.id === 1)[0].isAutoFocus = true;
    this.verifiedCodeObject.phoneNumber = this.user.employee.phoneNumber;
    this.verifiedCodeObject.verificationCode = 0;
    this.smsConfirmationService.sendCode(this.verifiedCodeObject).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, true, true)) {
          if (response) {
            this.startTimer();
          }
        }
      });
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  30-05-2019
   * Description : Create ngOnDestroy event for counter stop.
   */
  public ngOnDestroy(): void {
    this.counter.stop();
  }
}