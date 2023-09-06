/**
@author : Anjali Tandel
@class : SmsConfirmationService
@description :SmsConfirmationService is created for Send and Verify 6 digit code.
**/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiURL } from '../../../core/magic-string/common.model';
import { SmsConfirmationModel } from '../sms-confirmation-model';
import { environment } from '../../../../environments/environment';

@Injectable()
export class SmsConfirmationService {
  /** baseUrl variable stored api url from EnvironmentConfigService */
  private baseUrl: string;
  constructor(
    private httpClient: HttpClient,
    ) {
      this.baseUrl = environment.baseUrl
     }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  24-05-2019
   * Descriotion : API for send 6 digit code to registerd phone-number.
   */
  public sendCode(object: SmsConfirmationModel): Observable<Response> {
    return this.httpClient.post<Response>(this.baseUrl + ApiURL.SmsVerification, object);
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  24-05-2019
   * Descriotion : API for verify 6 digit code which sent to the registerd phone-number.
   */
  public verifyCode(object: SmsConfirmationModel): Observable<Response> {
    return this.httpClient.put<Response>(this.baseUrl + ApiURL.SmsVerification, object);
  }
}
