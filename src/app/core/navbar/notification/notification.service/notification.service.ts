/**
@author :Anjali Tandel
@class : NotificationService
@description :NotificationService is created for show users to their notification.
**/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ApiURL, NotificationModel, DateFormat } from '../../../magic-string/common.model';
// ----------------------------------------------------------------- //
import { environment } from '../../../../../environments/environment';
import { Response } from '../../../common.response';
@Injectable()
export class NotificationService {
  
  private baseUrl : string;
  constructor(
    private datePipe: DatePipe,
    private httpClient: HttpClient
  ) { 
    this.baseUrl = environment.baseUrl;
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  18-12-2018
  * Description : API for get all notification.
  */
  public getNotifications(empId: number, page: number, pageSize: number): Observable<Response> {
    const url: string = this.baseUrl + ApiURL.Notification + empId + `?pageNumber=${page}&rowsOfPage=${pageSize}`;
    return this.httpClient.get<Response>(url);
  }

  /**
  * Author : Sonal Patil
  * Modified-Date :  09-01-2019
  * Description : API for read notifications.
  */
  public readNotification(id: any): Observable<Response> {
    return this.httpClient.put<Response>(this.baseUrl + ApiURL.Notification + id, null);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date :  16-01-2019
  * Description : API for upload user profile.
  */
  public getActionRequest(notification: NotificationModel): Observable<Response> {
    return this.httpClient.get<Response>(this.baseUrl + ApiURL.ActionRequest + notification.requestId + '/' + notification.managerId + '/' + notification.empId + '/' + notification.actionId);
  }

  /**
  * Author : Anjali Tandel
  * Modified-Date : 25-05-2020
  * Description : API for get global assessment survey form.
  */
  public getGlobalAssessmentForm(surveyId: number, empId: number): Observable<Response> {
    return this.httpClient.get<Response>(this.baseUrl + ApiURL.Survey + ApiURL.GlobalAssessment + surveyId + '/' + empId);
  }

  /**
    * Author : Anjali Tandel
    * Modified-Date : 25-05-2020
    * Description : API for get global assessment survey form.
    */
  public getEmployeeSurveyForm(empId: number): Observable<Response> {
    let date = this.datePipe.transform(new Date(), DateFormat);
    return this.httpClient.get<Response>(this.baseUrl + ApiURL.Survey + ApiURL.WorkStatus + empId + '/' + date);
  }
}
