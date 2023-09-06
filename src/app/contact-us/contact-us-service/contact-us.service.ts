/**
@author : Mihir Patel
@class : ContactUsService
@description :ContactUsService is created for contact-us service call
**/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// ------------------------------------------------- //
import { environment } from '../../../environments/environment';
import { ApiURL } from '../../core/magic-string/common.model';
import { ContactUsModel } from '../contact-us-model';

@Injectable()
export class ContactUsService {

 private baseUrl : string;

  constructor(
    private httpClient: HttpClient,
    ) {
      this.baseUrl  = environment.baseUrl;
     }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  10-06-2019
   * Description : Contact-us method for calling api of contact-us.
   */
  public contactUs(object: ContactUsModel): Observable<Response> {
    return this.httpClient.post<Response>(this.baseUrl + ApiURL.ContactUs, object);
  }

}
