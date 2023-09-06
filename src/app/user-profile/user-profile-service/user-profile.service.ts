import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiURL } from '../../core/magic-string/common.model';
import { SmsNotificationModel, UserProfileModel, ThemeModel } from '../user-profile-model';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserProfileService {
  
  public baseUrl: string;

  constructor(
    private httpClient: HttpClient
    ) { 
      this.baseUrl = environment.baseUrl;
    }

  /**
  * Author : Mihir Patel
  * Created-Date :  14-05-2019
  * Descriotion : Create method for edit user profile.
  */
  public updateProfile(userId: number, bodyObj: any): Observable<Response> {
    return this.httpClient.put<Response>(this.baseUrl + ApiURL.ChangeProfile + userId, bodyObj);
  }

  /**
  * Author : Mihir Patel
  * Created-Date :  15-05-2019
  * Descriotion : Create method for get user profile.
  */
  public getProfile(empId: number): Observable<Response> {
    return this.httpClient.get<Response>(this.baseUrl + ApiURL.Employee + ApiURL.EditProfile + empId);
  }

  /**
 * Author : Mihir Patel
 * Created-Date :  16-05-2019
 * Descriotion : Create method for update user profile.
 */
  public updateUserProfile(userId: number, updateBody: UserProfileModel): Observable<Response> {
    return this.httpClient.put<Response>(this.baseUrl + ApiURL.Employee + ApiURL.EditProfile + userId, updateBody);
  }

  /**
  * Author : Mihir Patel
  * Created-Date :  20-05-2019
  * Descriotion : Create method for set flag of sms notification.
  */
  public allowSmsNotification(userId: number, smsNotificationBody: SmsNotificationModel): Observable<Response> {
    return this.httpClient.put<Response>(this.baseUrl + ApiURL.Employee + ApiURL.AllowSms + userId, smsNotificationBody);
  }

  /**
  * Author : Mihir Patel
  * Created-Date :  23-04-2020
  * Descriotion : Create method for set flag of theme.
  */
  public updateTheme(empId: number, updateThemeBody: ThemeModel): Observable<Response> {
    return this.httpClient.put<Response>(this.baseUrl + ApiURL.Employee + ApiURL.EditProfile + ApiURL.Theme +  empId, updateThemeBody);
  }
} 
