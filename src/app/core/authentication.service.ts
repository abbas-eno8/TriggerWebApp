/**
@author : Mihir Patel
@class : AuthenticationService
@description :AuthenticationService is created for user authentication operations.
**/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
// ----------------------------------------------------------- //
import { Response } from './common.response';
import { ApiURL, Version2 } from './magic-string/common.model';
import { CountryCallinCodeModel } from '../employees/employee-model';
import { Encryption } from './magic-string/common-validation-model';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  
  private baseUrl: string;
  redirectUrl: string;
  
  constructor(
    private httpClient: HttpClient
    ) {
      this.baseUrl = environment.baseUrl;
  }

  /**
   * Author : Mihir Patel
   * Modified-Date :  19-12-2018
   * Description : For user login.
   */ 
  login(user): Observable<Response> {
    var encrypted: any = CryptoJS.AES.encrypt(Version2.Version3, Encryption.Version);
    sessionStorage.setItem(Encryption.VersionKey, encrypted);
    // this.globalResponseHandlerService.encriptData(Version.Version2, Encryption.Version, Encryption.VersionKey)
    const body = {
      'username': user.profile.email
    };
    return this.httpClient.post<Response>(this.baseUrl + ApiURL.Login, body);
  }

  /**
   * Author : Mihir Patel
   * Modified-Date :  19-12-2018
   * Description : For Change password.
   */
  changePassword(object, userId): Observable<Response> {
    const body = {
      "userid": userId,
      "oldpassword": object.currentPassword,
      "newpassword": object.newPassword
    };
    return this.httpClient.post<Response>(this.baseUrl + ApiURL.ChangePassword, body);
  }

  getCallingcode(): Observable<CountryCallinCodeModel> {
    const callingCode = 'https://restcountries.eu/rest/v2/all';
    return this.httpClient.get<CountryCallinCodeModel>(callingCode);
  }
}
